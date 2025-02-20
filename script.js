document.getElementById('image-upload').addEventListener('change', function() {
    processImage();
});

function processImage() {
    const imageInput = document.getElementById('image-upload').files[0];
    if (!imageInput) return;

    const reader = new FileReader();
    reader.onload = function () {
        const image = new Image();
        image.src = reader.result;

        Tesseract.recognize(image.src, 'eng')
            .then(({ data: { text } }) => {
                const utr = extractUTR(text);
                document.getElementById('utr').value = utr || "UTR not found";
            })
            .catch(error => console.error(error));
    };
    reader.readAsDataURL(imageInput);
}

function extractUTR(text) {
    const utrPattern = /\b\d{12}\b/; 
    const match = text.match(utrPattern);
    return match ? match[0] : null;
}
