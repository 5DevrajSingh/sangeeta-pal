import { getApp, getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBM7NAXwv4JuYgkShuEEhkuC3HUnWHFZU4",
  authDomain: "nova-health-care.firebaseapp.com",
  databaseURL: "https://nova-health-care-default-rtdb.firebaseio.com",
  projectId: "nova-health-care",
  storageBucket: "nova-health-care.firebasestorage.app",
  messagingSenderId: "82773575688",
  appId: "1:82773575688:web:b4b9e477d552cc515ee9bd",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const database = getDatabase(app);