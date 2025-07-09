import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Add a user
export const addUser = async (userData: { name: string; role: string }) => {
  await addDoc(collection(db, "users"), userData);
};

// Get all users
export const fetchUsers = async () => {
  const snapshot = await getDocs(collection(db, "users"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
