// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO7DfrYftfsgFHDNHkipJ4w5a4uz6MQLY",
  authDomain: "audio-central-client.firebaseapp.com",
  projectId: "audio-central-client",
  storageBucket: "audio-central-client.appspot.com",
  messagingSenderId: "537532270532",
  appId: "1:537532270532:web:238f5fb2e00b1e09fb8691",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app); // Storage

// Export initialized services
export { storage };
