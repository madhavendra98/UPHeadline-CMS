import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = async function () {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email और Password भरें");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, password);

        localStorage.setItem("admin", "true");

        alert("✅ Login Successful");

        window.location.href = "admin.html";

    } catch (error) {

        alert("❌ Login Failed\n\n" + error.message);

    }

};
