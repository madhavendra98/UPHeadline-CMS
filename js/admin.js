import { db } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

window.publishNews = async function () {

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const image = document.getElementById("image").value.trim();
    const category = document.getElementById("category").value;

    if (title === "" || description === "") {
        alert("Title और Description भरें");
        return;
    }

    try {

        await push(ref(db, "news"), {

            title: title,
            description: description,
            image: image,
            category: category,
            date: Date.now()

        });

        alert("✅ News Published Successfully");

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        document.getElementById("image").value = "";
        document.getElementById("category").selectedIndex = 0;

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

};
import { ref, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const newsList = document.getElementById("newsList");

onValue(ref(db, "news"), (snapshot) => {
    newsList.innerHTML = "";

    if (!snapshot.exists()) return;

    const data = snapshot.val();

    Object.entries(data).reverse().forEach(([id, news]) => {

        newsList.innerHTML += `
        <div class="news-card">
            <h3>${news.title}</h3>
            <p>${news.description}</p>

            <button onclick="deleteNews('${id}')">🗑 Delete</button>
        </div>
        `;
    });
});

window.deleteNews = async function(id) {

    if (!confirm("क्या आप यह News हटाना चाहते हैं?")) return;

    await remove(ref(db, "news/" + id));

    alert("News Deleted");
}
