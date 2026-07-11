import { db } from "./firebase-config.js";
import { ref, get } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {

    get(ref(db, "news/" + id)).then((snapshot) => {

        if (!snapshot.exists()) {
            document.body.innerHTML = "<h2>News Not Found</h2>";
            return;
        }

        const news = snapshot.val();

        document.getElementById("newsImage").src =
            news.image || "https://picsum.photos/700/400";

        document.getElementById("newsTitle").innerText =
            news.title;

        document.getElementById("newsCategory").innerText =
            news.category;

        document.getElementById("newsDescription").innerText =
            news.description;

    });

}
