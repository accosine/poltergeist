module.exports = (exp, functions, admin) => {
  try {
    admin.initializeApp(functions.config().firebase);
  } catch (e) {
    // if it throws, it means it has already been initialized and can be ignored
  }
  const firestore = admin.firestore();

  const indexing = (kind, indexKey) => (change, context) => {
    const diff = (a, b) => a.filter(value => !b.includes(value));
    // removes or adds the given document's slug to all passed indexes
    const indexTransaction = action => (doc, keys = []) =>
      firestore.runTransaction(async t => {
        const now = new Date();
        await Promise.all(
          keys.map(async key => {
            const ref = firestore
              .collection(`indexes/${indexKey}/pagination`)
              .doc(key);
            const index = (await t.get(ref)).data();

            // filter and add or only filter the document from the index array
            // depending on method
            let newSlugs = [];
            if (action === 'update') {
              newSlugs = ((index && index.slugs) || []).map(s =>
                s.kind === kind && s.slug === doc.slug
                  ? { ...s, modified: now }
                  : s
              );
            } else {
              newSlugs = [
                ...(action === 'add'
                  ? [
                      {
                        kind,
                        slug: doc.slug,
                        collection: doc.collection,
                        modified: now,
                      },
                    ]
                  : []),
                ...((index && index.slugs) || []).filter(
                  s => s.kind !== kind || s.slug !== doc.slug
                ),
              ];
            }

            if (newSlugs.length) {
              if (index) {
                await t.update(ref, { slugs: newSlugs });
              } else {
                await t.set(ref, { slugs: newSlugs });
              }
            } else {
              await t.delete(ref);
            }
          })
        );
      });
    const removeFromIndexes = indexTransaction('remove');
    const addToIndexes = indexTransaction('add');
    const updateIndexes = indexTransaction('update');
    const docBefore = change.before.exists ? change.before.data() : null;
    const doc = change.after.exists ? change.after.data() : null;

    // no previous document exists and created document is published
    // or previous document was not published but now is
    if (
      (!change.before.exists && doc.published) ||
      (!docBefore.published && doc.published)
    ) {
      try {
        switch (indexKey) {
          case 'tags':
            return addToIndexes(doc, doc.tags);
          case 'collections':
            return addToIndexes(doc, [doc.collection]);
          case 'start':
            return addToIndexes(doc, ['all']);
          default:
            return null;
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      // document gets unpublished or deleted
    } else if (
      docBefore.published &&
      (!doc.published || !change.after.exists)
    ) {
      try {
        switch (indexKey) {
          case 'tags':
            return removeFromIndexes(doc, doc.tags);
          case 'collections':
            return removeFromIndexes(doc, [doc.collection]);
          case 'start':
            return removeFromIndexes(doc, ['all']);
          default:
            return null;
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      // document changes and document is published
    } else if (
      docBefore.published &&
      doc.published &&
      change.before.exists &&
      change.after.exists
    ) {
      try {
        if (indexKey === 'collections') {
          return addToIndexes(doc, [doc.collection]);
        } else if (indexKey === 'start') {
          return addToIndexes(doc, ['all']);
        } else if (indexKey === 'tags') {
          const tagsBefore = docBefore.tags || [];
          const tagsAfter = doc.tags || [];
          const removedTags = diff(tagsBefore, tagsAfter);
          const addedTags = diff(tagsAfter, tagsBefore);
          return Promise.all([
            removeFromIndexes(doc, removedTags),
            addToIndexes(doc, addedTags),
          ]);
        } else {
          return null;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      return null;
    }
  };

  exp.numerologyArticleTagging = functions.firestore
    .document('articles/{document}')
    .onWrite(indexing('article', 'tags'));

  exp.numerologyPageTagging = functions.firestore
    .document('pages/{document}')
    .onWrite(indexing('page', 'tags'));

  exp.numerologyArticleCollection = functions.firestore
    .document('articles/{document}')
    .onWrite(indexing('article', 'collections'));

  exp.numerologyPageCollection = functions.firestore
    .document('pages/{document}')
    .onWrite(indexing('page', 'collections'));

  exp.numerologyArticleStart = functions.firestore
    .document('articles/{document}')
    .onWrite(indexing('article', 'start'));

  exp.numerologyPageStart = functions.firestore
    .document('pages/{document}')
    .onWrite(indexing('page', 'start'));
};
