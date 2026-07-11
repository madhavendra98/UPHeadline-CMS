let allNews = [];
import { db } from "./firebase-config.js";
import { ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

console.log("APP JS LOADED");

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
    const newsArray = Object.entries(data).reverse();
allNews = newsArray;
displayNews(newsArray);
return;
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
const slides = [
{
image:"https://picsum.photos/1200/450?1",
title:"UPHeadline Breaking News"
},
{
image:"https://picsum.photos/1200/450?2",
title:"Latest India News"
},
{
image:"https://picsum.photos/1200/450?3",
title:"World News Updates"
}
];

let current = 0;

setInterval(()=>{

current++;

if(current>=slides.length) current=0;

document.getElementById("sliderImage").src=slides[current].image;

document.getElementById("sliderTitle").innerText=slides[current].title;

},3000);
