import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

console.log("APP JS LOADED");

const newsContainer = document.getElementById("newsContainer");

const newsRef = ref(db, "news");

onValue(newsRef, (snapshot) => {
    console.log(snapshot.val());

const newsContainer = document.getElementById("newsContainer");

const newsRef = ref(db, "news");

onValue(newsRef, (snapshot) => {

    newsContainer.innerHTML = "";

    if (!snapshot.exists()) {
        newsContainer.innerHTML = `
            <h2 style="text-align:center;color:red;">
                अभी कोई समाचार उपलब्ध नहीं है।
            </h2>
        `;
        return;
    }

    const data = snapshot.val();

    const newsArray = Object.entries(data);

    // सबसे नई खबर सबसे ऊपर
    newsArray.reverse();

    newsArray.forEach(([key, news]) => {

        newsContainer.innerHTML += `

        <div class="news-card" onclick="window.location='news.html?id=${key}'" style="cursor:pointer;">

            <img src="${news.image || 'https://picsum.photos/600/350'}" alt="News">

            <div style="padding:15px;">

                <small style="color:red;font-weight:bold;">
                    ${news.category}
                </small>

                <h2>${news.title}</h2>

                <p>${news.description}</p>

            </div>

        </div>

        `;

    });

});
