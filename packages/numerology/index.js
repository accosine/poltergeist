module.exports = (exp, functions, admin) => {
  try {
    admin.initializeApp(functions.config().firebase);
  } catch (e) {
    // if it throws, it means it has already been initialized and can be ignored
  }
  const firestore = admin.firestore();

  const EVENTID_BUFFER_SIZE = 20;

  const counter = type => (change, context) => {
    const documentBefore = change.before.exists ? change.before.data() : {};
    const document = change.after.data();

    // make cloud function invocation idempotent
    if (
      document.counterEventIds &&
      document.counterEventIds.includes(context.eventId)
    ) {
      return false;
    }

    // no previous document exists and created document is published
    // or previous document was not published but now is
    if (
      (!change.before.exists && document.published) ||
      (!documentBefore.published && document.published)
    ) {
      return firestore.runTransaction(async t => {
        const documentRef = firestore
          .collection(type)
          .doc(context.params.document);
        const counterRef = firestore.collection('ledger').doc('counter');
        const counter = (await t.get(counterRef)).data();

        // increment if exists, otherwise initialize with 1
        const collectionSequence =
          counter && counter[type] && counter[type][document.collection]
            ? counter[type][document.collection] + 1
            : 1;
        const typeSequence =
          counter && counter[type]
            ? Object.values(counter[type]).reduce((acc, curr) => acc + curr) + 1
            : 1;

        if (counter) {
          await t.update(counterRef, {
            [type + '.' + document.collection]: collectionSequence,
          });
        } else {
          await t.set(counterRef, {
            [type]: {
              [document.collection]: collectionSequence,
            },
          });
        }

        await t.update(documentRef, {
          counterEventIds: [
            context.eventId,
            ...(document.counterEventIds || []),
          ].slice(0, EVENTID_BUFFER_SIZE),
          collectionSequence,
          typeSequence,
        });
      });
    } else {
      return false;
    }
  };

  const tagging = kind => (change, context) => {
    const diff = (a, b) => a.filter(value => !b.includes(value));
    // removes or adds the given document's slug to all passed tags
    const tagsTransaction = action => (doc, tags = []) =>
      firestore.runTransaction(async t => {
        await Promise.all(
          tags.map(async tag => {
            const tagsRef = firestore.collection('tags').doc(tag);
            const tagSlugs = (await t.get(tagsRef)).data();

            // filter and add or only filter the document from the tag array
            // depending on method
            const newTagSlugs = [
              ...(action === 'add' ? [kind + '__' + doc.slug] : []),
              ...((tagSlugs && tagSlugs.pagination) || []).filter(
                s => s !== kind + '__' + doc.slug
              ),
            ];
            if (newTagSlugs.length) {
              if (tagSlugs) {
                await t.update(tagsRef, { pagination: newTagSlugs });
              } else {
                await t.set(tagsRef, { pagination: newTagSlugs });
              }
            } else {
              await t.delete(tagsRef);
            }
          })
        );
      });
    const removeFromTags = tagsTransaction('remove');
    const addToTags = tagsTransaction('add');
    const docBefore = change.before.exists ? change.before.data() : null;
    const doc = change.after.exists ? change.after.data() : null;

    // no previous document exists and created document is published
    // or previous document was not published but now is
    if (
      (!change.before.exists && doc.published) ||
      (!docBefore.published && doc.published)
    ) {
      try {
        return addToTags(doc, doc.tags);
      } catch (error) {
        console.log(error);
        return false;
      }

      // article gets unpublished or deleted
    } else if (
      docBefore.published &&
      (!doc.published || !change.after.exists)
    ) {
      try {
        return removeFromTags(doc, doc.tags);
      } catch (error) {
        console.log(error);
        return false;
      }

      // tag(s) get added or removed and article/page is published
    } else if (
      docBefore.published &&
      doc.published &&
      change.before.exists &&
      change.after.exists
    ) {
      const tagsBefore = docBefore.tags || [];
      const tagsAfter = doc.tags || [];
      const removedTags = diff(tagsBefore, tagsAfter);
      const addedTags = diff(tagsAfter, tagsBefore);
      try {
        return Promise.all([
          removeFromTags(doc, removedTags),
          addToTags(doc, addedTags),
        ]);
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return false;
    }
  };

  exp.numerologyArticleTagging = functions.firestore
    .document('articles/{document}')
    .onWrite(tagging('article'));

  exp.numerologyPageTagging = functions.firestore
    .document('pages/{document}')
    .onWrite(tagging('page'));

  exp.numerologyArticles = functions.firestore
    .document('articles/{document}')
    .onWrite(counter('articles'));

  exp.numerologyPages = functions.firestore
    .document('pages/{document}')
    .onWrite(counter('pages'));
};
