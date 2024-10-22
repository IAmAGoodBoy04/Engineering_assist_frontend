

document.getElementById('file_upload').addEventListener('change', function(event) {
    const fileInput = event.target;
    const fileNameSpan = document.getElementById('file_name');
    
    if (fileInput.files.length > 0) {
        fileNameSpan.textContent = `Selected file: ${fileInput.files[0].name}`;
    } else {
        fileNameSpan.textContent = '';
    }
});