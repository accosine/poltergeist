module.exports = (exp, functions, admin) => {
  try {
    admin.initializeApp(functions.config().firebase);
  } catch (e) {
    // if it throws, it means it has already been initialized and can be ignored
  }
  const firestore = admin.firestore();

  const counter = type => (snapshot, context) => {
    const document = snapshot.data();
    if (document.counterEventId) {
      return false;
    }

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
        counterEventId: context.eventId,
        collectionSequence,
        typeSequence,
      });
    });
  };

  exp.numerologyArticles = functions.firestore
    .document('articles/{document}')
    .onCreate(counter('articles'));
  exp.numerologyPages = functions.firestore
    .document('pages/{document}')
    .onCreate(counter('pages'));
};
