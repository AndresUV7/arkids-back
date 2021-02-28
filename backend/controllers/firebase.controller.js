var admin = require("firebase-admin");
const uuid = require("uuid-v4");
const firebaseCtrl = {};
// CHANGE: The path to your service account
var serviceAccount = require("../firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "arkids-da65c.appspot.com/",
});

var bucket = admin.storage().bucket();

var filename = "test1.jpg";

firebaseCtrl.testFirebase = async () => {
  const metadata = {
    metadata: {
      // This line is very important. It's to create a download token.
      firebaseStorageDownloadTokens: uuid(),
    },
    contentType: "image/jpg",
    cacheControl: "public, max-age=31536000",
  };

  // Uploads a local file to the bucket
  await bucket
    .upload(filename, {
      // Support for HTTP requests made with `Accept-Encoding: gzip`
      gzip: true,
      metadata: metadata,
    })
    .then((data) => {
      console.log(data);
    });

  console.log(`${filename} uploaded.`);
};

module.exports = firebaseCtrl;
