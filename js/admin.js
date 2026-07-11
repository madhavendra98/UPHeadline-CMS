import { db, storage } from "./firebase-config.js";
import {
  ref,
  push,
  onValue,
  remove,
  update
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
// Publish News
window.publishNews = async function () {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").value.trim();
    const category = document.getElementById("category").value;

    if (!title || !description) {
        alert("Title और Description भरें");
        return;
    }

    try {

        await push(ref(db, "news"), {

            title,
            description,
            image,
            category,
            date: Date.now()

        });

        alert("✅ News Published Successfully");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";
        document.getElementById("category").selectedIndex = 0;

    } catch (error) {

        alert(error.message);

    }

};

// Show News List

const newsList = document.getElementById("newsList");

onValue(ref(db, "news"), (snapshot) => {

    if (!newsList) return;

    newsList.innerHTML = "";

    if (!snapshot.exists()) {

        newsList.innerHTML = "<h3>No News Available</h3>";

        return;

    }

    const data = snapshot.val();

    Object.entries(data).reverse().forEach(([id, news]) => {

        newsList.innerHTML += `

        <div class="news-card">

            <img src="${news.image || 'https://picsum.photos/400/250'}">

            <h3>${news.title}</h3>

            <p>${news.description}</p>

            <small>${news.category}</small>

            <br><br>

            <button onclick="editNews('${id}')">
                ✏️ Edit
            </button>

            <button onclick="deleteNews('${id}')">
                🗑 Delete
            </button>

        </div>

        `;

    });

});

// Delete News

window.deleteNews = async function(id){

    if(!confirm("क्या आप यह News Delete करना चाहते हैं?"))
        return;

    await remove(ref(db,"news/"+id));

    alert("✅ News Deleted");

};

// Edit News

window.editNews = async function(id){

    const title = prompt("New Title");

    if(title==null) return;

    const description = prompt("New Description");

    if(description==null) return;

    await update(ref(db,"news/"+id),{

        title,
        description

    });

    alert("✅ News Updated");

};
