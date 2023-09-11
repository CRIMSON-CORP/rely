// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
    VITE_API_KEY,
    VITE_AUTH_DOMAIN,
    VITE_PROJECT_ID,
    VITE_STORAGE_BUCKET,
    VITE_MESSAGING_SENDER_ID,
    VITE_APP_ID,
    VITE_MEASUREMENT_ID,
} = import.meta.env;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: VITE_API_KEY,
    authDomain: VITE_AUTH_DOMAIN,
    projectId: VITE_PROJECT_ID,
    storageBucket: VITE_STORAGE_BUCKET,
    messagingSenderId: VITE_MESSAGING_SENDER_ID,
    appId: VITE_APP_ID,
    measurementId: VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getFirestore(app);

const modal = document.getElementById("modal");
const form = modal.querySelector("form");
const submitButton = form.querySelector('button[type="submit"]');

form.onsubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const fullName = formData.get("full-name");
    const email = formData.get("email");
    const mobileNumber = formData.get("mobile-number");
    let platform = "";

    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("android")) {
        platform = "Android";
    } else if (userAgent.includes("win")) {
        platform = "Windows";
    } else if (userAgent.includes("macintosh")) {
        platform = "Macbook";
    } else if (
        userAgent.includes("iphone") ||
        userAgent.includes("ipad") ||
        userAgent.includes("ipod")
    ) {
        platform = "Iphone";
    } else {
        platform = "Not Determined";
    }

    if (fullName.trim() === "" || email.trim() === "" || mobileNumber.trim() === "")
        return alert("Please fill all input fields 🥹!");

    try {
        submitButton.classList.add("loading");
        submitButton.classList.remove("success");
        submitButton.style.pointerEvents = "none";
        await addDoc(collection(database, "anticipated-users"), {
            full_name: fullName,
            email,
            mobile_number: mobileNumber,
            platform,
            created_at: serverTimestamp(),
        });
        submitButton.classList.add("success");
        submitButton.classList.remove("loading");

        window.dispatchEvent(new CustomEvent("form-submitted", { detail: fullName.split(" ")[0] }));
    } catch (e) {
        submitButton.classList.remove("success");
        submitButton.classList.remove("loading");
        console.error("Error adding document: ", e);
    } finally {
        submitButton.style.pointerEvents = "auto";
    }
};
