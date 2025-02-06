function processImage() {
    const imageInput = document.getElementById('image-upload').files[0];
    if (!imageInput) {
        alert('Please upload an image!');
        return;
    }
    const reader = new FileReader();
    reader.onload = function () {
        const image = new Image();
        image.src = reader.result;
        Tesseract.recognize(image.src, 'eng')
            .then(({ data: { text } }) => {
                const utr = extractUTR(text);
                document.getElementById('result').innerText = utr
                    ? `Extracted UTR: ${utr}`
                    : 'UTR not found!';
            })
            .catch((error) => console.error(error));
    };
    reader.readAsDataURL(imageInput);
}

function extractUTR(text) {
    // Use regex to find UTR patterns (customize as needed)
    const utrPattern = /\b\d{12}\b/; // Match exactly 12 digits
    const match = text.match(utrPattern);
    return match ? match[0] : null;
}
