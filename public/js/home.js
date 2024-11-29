import { db } from './firebase.js';
import { collection, getDocs } from "firebase/firestore";

const blogSection = document.querySelector('.blogs-section');

getDocs(collection(db, "blogs"))
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            blogSection.innerHTML += `
                <div class="blog-card">
                    <img src="${data.bannerImage}" class="blog-image" alt="">
                    <h1 class="blog-title">${data.title.substring(0, 100)}...</h1>
                    <p class="blog-overview">${data.article.substring(0, 200)}...</p>
                    <a href="/blog.html?id=${doc.id}" class="btn dark">Read</a>
                </div>
            `;
        });
    })
    .catch((error) => {
        console.error("Error fetching blogs:", error);
    });
