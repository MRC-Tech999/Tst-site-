// ✅ Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ✅ Configuration de ton projet Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  databaseURL: "https://TON_PROJET-default-rtdb.firebaseio.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_MESSAGING_ID",
  appId: "TON_APP_ID"
};

// ✅ Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export de la base de données
export const database = getDatabase(app);
