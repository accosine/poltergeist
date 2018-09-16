const admin = require('firebase-admin');
const functions = require('firebase-functions');
const firestore = admin.firestore();

module.exports = () => async user => {
  const waitlist = firestore.collection('waitlist');
  const users = firestore.collection('users');

  try {
    const doc = await waitlist.doc(user.email).get();

    if (doc.exists) {
      const { role } = doc.data();
      // set user
      try {
        await users.doc(user.uid).set({ role });
        await waitlist.doc(user.email).delete();
      } catch (err) {
        console.log(`Failed to create user ${user.email}`);
      }
    }
  } catch (err) {
    console.log(`Failed to get waitlist user`);
  }
};
