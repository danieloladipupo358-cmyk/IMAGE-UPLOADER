const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const browseBtn = document.getElementById("browse-btn");

const uploadContent = document.getElementById("upload-content");
const previewContainer = document.getElementById("preview-container");

const previewImage = document.getElementById("preview-image");
const fileName = document.getElementById("file-name");
const fileSize = document.getElementById("file-size");

const removeBtn = document.getElementById("remove-btn");


// Open file selector
browseBtn.addEventListener("click", () => {
    fileInput.click();
});



fileInput.addEventListener("change", () => {

    if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
    }

});



dropArea.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropArea.classList.add("dragover");

});



dropArea.addEventListener("dragleave", () => {

    dropArea.classList.remove("dragover");

});



dropArea.addEventListener("drop", (event) => {

    event.preventDefault();

    dropArea.classList.remove("dragover");

    const files = event.dataTransfer.files;

    if (files.length > 0) {
        handleFile(files[0]);
    }

});



function handleFile(file) {

    // Check if it is an image
    if (!file.type.startsWith("image/")) {

        alert("Please select an image file.");

        return;
    }


    
    const reader = new FileReader();

    reader.onload = function(event) {

        previewImage.src = event.target.result;

        fileName.textContent = "Name: " + file.name;

        fileSize.textContent =
            "Size: " + formatFileSize(file.size);


        uploadContent.style.display = "none";

        previewContainer.style.display = "block";

    };


    reader.readAsDataURL(file);
}



function formatFileSize(bytes) {

    if (bytes < 1024) {
        return bytes + " Bytes";
    }

    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(2) + " KB";
    }

    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}



removeBtn.addEventListener("click", () => {

    fileInput.value = "";

    previewImage.src = "";

    fileName.textContent = "";
    fileSize.textContent = "";

    previewContainer.style.display = "none";

    uploadContent.style.display = "block";

});