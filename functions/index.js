/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");

// import firebase
const admin = require("firebase-admin");
const serviceAccount =
  require("./clever-math-dev-v2-firebase-adminsdk-bl3fv-ca5c332ea2.json");

// initial firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://clever-math-dev-v2.firebaseio.com",
});

const db = admin.firestore();


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.getListSchoolPantchanit = onRequest(async (_, res) => {
  const schoolsColl = db.collection("schools");
  const listSchools = await schoolsColl.get();
  const responseSchools = [];
  listSchools.forEach((ele) => {
    responseSchools.push(ele.data());
  });
  res.send(responseSchools);
});
