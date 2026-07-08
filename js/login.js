import { auth } from "./firebase-config.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

window.login = function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

localStorage.setItem("admin","true");

window.location="admin.html";

})

.catch(()=>{

document.getElementById("msg").innerHTML="Wrong Email or Password";

});

}
