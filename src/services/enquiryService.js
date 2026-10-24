import { push, ref, serverTimestamp, set } from "firebase/database";
import { database } from "../config/firebase";

export async function saveEnquiry(form) {
  const enquiryRef = push(ref(database, "enquiries"));

  await set(enquiryRef, {
    name: form.name.trim(),
    mobile: form.mobile.trim(),
    email: form.email.trim(),
    date: form.date,
    session: form.session,
    message: form.message.trim(),
    status: "pending",
    createdAt: serverTimestamp(),
  });

  return enquiryRef.key;
}