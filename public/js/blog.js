import { db } from './firebase.js';
import { doc, getDoc } from "firebase/firestore";

const blogId = new URLSearchParams(window.location.search).get('id');
if (!blogId) location.replace('/home.html'); // Redirect if no ID

const docRef = doc(db, "blogs", blogId);

getDoc(docRef)
    .then((doc) => {
        if (doc.exists()) {
            const data = doc.data();
            document.querySelector('.banner').style.backgroundImage = `url(${data.bannerImage})`;
            document.querySelector('.title').textContent = data.title;
            document.querySelector('title').textContent = data.title;
            document.querySelector('.published').textContent = `Published on ${data.publishedAt.toDate()}`;
            document.querySelector('.article').innerHTML = data.article.split('\n').map(line => `<p>${line}</p>`).join('');
        } else {
            location.replace("/home.html");
        }
    })
    .catch((error) => {
        console.error("Error fetching blog:", error);
        location.replace("/home.html");
    });
