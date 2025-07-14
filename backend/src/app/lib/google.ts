import { google } from "googleapis";
const googleAPIAuth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/documents.readonly"],
});


export default googleAPIAuth;