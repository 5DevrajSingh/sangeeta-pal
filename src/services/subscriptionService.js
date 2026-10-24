import { push, ref, serverTimestamp, set } from "firebase/database";
import { database } from "../config/firebase";

export async function saveSubscription(value) {
  const email = value.trim().toLowerCase();

  if (
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    throw new Error("Please enter a valid email address.");
  }

  const subscriptionRef = push(ref(database, "subscriptions"));

  await set(subscriptionRef, {
    email,
    status: "active",
    source: "footer",
    createdAt: serverTimestamp(),
  });

  return subscriptionRef.key;
}