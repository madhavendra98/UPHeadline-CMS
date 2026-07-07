import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { db } from "./firebase-config.js";

const newsContainer = document.getElementById("newsContainer");

const newsQuery = query(
  collection(db, "news"),
  orderBy("date", "desc")
);

onSnapshot(newsQuery, (snapshot) => {

  newsContainer.innerHTML = "";

  if (snapshot.empty) {
    newsContainer.innerHTML = `
      <h2 style="text-align:center;">
        अभी कोई समाचार उपलब्ध नहीं है।
      </h2>
    `;
    return;
  }

  snapshot.forEach((doc) => {

    const news = doc.data();

    newsContainer.innerHTML += `

      <div class="news-card">

        <img src="${news.image || 'https://via.placeholder.com/400x250'}">

        <h3>${news.title}</h3>

        <p>${news.description || ""}</p>

      </div>

    `;

  });

});
