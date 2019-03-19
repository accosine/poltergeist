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

  exp.numerologyArticles = functions.firestore
    .document('articles/{document}')
    .onWrite(counter('articles'));

  exp.numerologyPages = functions.firestore
    .document('pages/{document}')
    .onWrite(counter('pages'));
};
