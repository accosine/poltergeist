const admin = require('firebase-admin');
const firestore = admin.firestore();

module.exports = () => async user => {
  const waitlist = firestore.collection('waitingusers');
  const pendingusers = firestore.collection('pendingusers');
  const staffusers = firestore.collection('staffusers');

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
