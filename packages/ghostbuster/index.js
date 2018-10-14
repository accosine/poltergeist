module.exports = (exp, functions, admin) => {
  try {
    admin.initializeApp(functions.config().firebase);
  } catch (e) {
    // if it throws, it means it has already been initialized and can be ignored
  }

  const firestore = admin.firestore();
  const waitlist = firestore.collection('waitingusers');
  const pendingusers = firestore.collection('pendingusers');
  const staffusers = firestore.collection('staffusers');

  const hire = async user => {
    try {
      const doc = await waitlist.doc(user.email).get();

      if (doc.exists) {
        const { role } = doc.data();
        // set user
        try {
          await staffusers.doc(user.uid).set({ email: user.email, role });
          await waitlist.doc(user.email).delete();
        } catch (err) {
          console.log(`Failed to create user ${user.email}`);
        }
      } else {
        await pendingusers.doc(user.uid).set({ email: user.email });
      }
    } catch (err) {
      console.log(`Failed to get waitlist user`);
    }
  };

  const fire = snapshot => {
    console.log('snapshot: ', snapshot);
    return admin.auth().deleteUser(snapshot.id);
  };

  exp.ghostbusterHire = functions.auth.user().onCreate(hire);
  exp.ghostbusterFire = functions.firestore
    .document('staffusers/{userID}')
    .onDelete(fire);
};
