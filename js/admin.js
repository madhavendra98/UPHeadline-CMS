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
    const category = document.getElementById("category").value;
    const file = document.getElementById("imageFile").files[0];

    if (!title || !description) {
        alert("Title और Description भरें");
        return;
    }

    let image = "https://picsum.photos/600/350";

    if (file) {

        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch(
            "https://api.imgbb.com/1/upload?key=a7696bd67a3c728c76935a34574a27aa",
            {
                method: "POST",
                body: formData
            }
        );

        const result = await response.json();

        image = result.data.url;
    }

    await push(ref(db, "news"), {

        title,
        description,
        category,
        image,
        date: Date.now()

    });

    alert("✅ News Published Successfully");

    location.reload();

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
