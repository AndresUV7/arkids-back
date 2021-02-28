const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const driveCtrl = {};
let files = [];
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"]; // The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.

driveCtrl.getTest = async (req, res) => {
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    // authorize(JSON.parse(content), listFiles);
    authorize(
      JSON.parse(content),
      getFile,
      "1QtjYK5F7axFR51eK2abjOcva4LhMcxLa"
    );

    setTimeout(() => res.json(files), 2000);
  });
};

// driveCtrl.postTest = async (req, res) => {

//   fs.readFile("credentials.json", (err, content) => {
//     if (err) return console.log("Error loading client secret file:", err);
//     // Authorize a client with credentials, then call the Google Drive API.
//     // authorize(JSON.parse(content), listFiles);

//     authorize(JSON.parse(content), uploadFile, req);

//     return files;

//   });

// };

driveCtrl.postTest = () => {
  return new Promise((resolve) => {
    fs.readFile("credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Drive API.
      // authorize(JSON.parse(content), listFiles);

      authorize(JSON.parse(content), uploadFile);
    });
    setTimeout(() => {
      resolve(files);
    }, 2000);
  });
};

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, code) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, code);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({ version: "v3", auth });
  drive.files.list(
    {
      pageSize: 100,
      fields: "nextPageToken, files(id, name)",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      files = res.data.files;
      if (files.length) {
        console.log('Files:');
        files.map((file) => {
          console.log(files);
        });
      } else {
        console.log('No files found.');
      }
    }
  );
}

function getFile(auth, fileId) {
  const drive = google.drive({ version: "v3", auth });
  drive.files.get({ fileId: fileId, fields: "*" }, (err, res) => {
    if (err) return console.log("The API returned an error: " + err);
    files = res.data;
  });
}

function uploadFile(auth) {
  const drive = google.drive({ version: "v3", auth });
  const f = 'respaldo.csv'
  var fileMetadata = {
    name: f,
  };
  var media = {
    mimeType: "text/csv",
    body: fs.createReadStream(f),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, res) {
      if (err) {
        // Handle error
        console.log(err);
      } else {
        console.log("File Id: ", res.data.id);
        files = res.data.id;
        console.log(files);
        fs.unlink(f, (err) => {
          if (err) {
            console.log("failed to delete local image:" + err);
          } else {
            console.log("successfully deleted local image");
          }
        });
      }
    }
  );
}

module.exports = driveCtrl;
