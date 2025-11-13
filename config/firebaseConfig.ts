import { initializeApp, getApps, getApp } from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCOyEC2z-DSa_YfJkEQAYbjYBLmCvgI6C8",
  authDomain: "gsmobile-b94f7.firebaseapp.com",
  databaseURL: "https://gsmobile-b94f7-default-rtdb.firebaseio.com",
  projectId: "gsmobile-b94f7",
  storageBucket: "gsmobile-b94f7.firebasestorage.app",
  messagingSenderId: "256549198091",
  appId: "1:256549198091:android:917d361276cabbea922a0e"
};

// Evita inicializar mais de uma vez
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebaseApp;
