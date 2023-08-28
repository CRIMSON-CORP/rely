// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCZijOT51EWxaSD6wfni7iG33OvoDhltbE",
    authDomain: "rely-3d4d0.firebaseapp.com",
    projectId: "rely-3d4d0",
    storageBucket: "rely-3d4d0.appspot.com",
    messagingSenderId: "796944035349",
    appId: "1:796944035349:web:f2f066c8817f8cef48281c",
    measurementId: "G-ZHKKCD0THX",
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
