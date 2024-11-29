import { db } from './firebase.js';
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { v2 as cloudinary } from 'cloudinary';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";  // Import Firebase Storage

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'dhrxi7vye',
    api_key: '459753749857185',
    api_secret: 'qh_1U81xsfkcDUVFObvq55vZhVM'
});

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
const publishBtn = document.querySelector('.publish-btn');
let bannerPath = ""; // Default to empty string

// Handle banner upload
bannerUpload.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'your-upload-preset'); // Replace with your Cloudinary preset

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/your-cloud-name/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            bannerPath = data.secure_url; // Store Cloudinary image URL
            console.log("Banner uploaded:", bannerPath);
        } catch (error) {
            console.error("Error uploading banner:", error);
        }
    }
});

// Get Firebase Storage reference
const storage = getStorage();


publishBtn.addEventListener('click', async () => {
    // Validate inputs
    if (!blogTitleField.value.trim() || !articleField.value.trim()) {
        console.error("Validation failed: Title or article is empty.");
        return;
    }

    try {
        // Create a new Firestore document
        const blogId = new Date().getTime().toString(); // Unique ID based on timestamp
        const blogData = {
            title: blogTitleField.value.trim(),
            article: articleField.value.trim(),
            bannerImage: bannerPath || '', // Default to empty string if no banner
            publishedAt: Timestamp.fromDate(new Date()),
        };

        await setDoc(doc(db, "blogs", blogId), blogData);
        console.log("Blog published:", blogData);
        location.href = `blog.html?id=${blogId}`; // Redirect to the blog page
    } catch (error) {
        console.error("Error publishing blog:", error.message);
        alert("Failed to publish blog. Please try again.");
    }
});
