function handleFileSelect(file) {
    if (typeof document === 'undefined') return;
    const uploadArea = document.getElementById('uploadArea');
    const uploadDetails = document.getElementById('uploadDetails');
    const videoTitleInput = document.getElementById('videoTitleInput');
    if (!uploadArea || !uploadDetails || !videoTitleInput) return;
    uploadArea.style.display = 'none';
    uploadDetails.style.display = 'block';
    videoTitleInput.value = file.name.replace(/\.[^/.]+$/, "");
}

if (typeof document !== 'undefined') {
    const uploadArea = document.getElementById('uploadArea');
    const videoFile = document.getElementById('videoFile');
    const uploadForm = document.getElementById('uploadForm');

    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#065fd4';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = '#3f3f3f';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = '#3f3f3f';
            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('video/')) {
                handleFileSelect(files[0]);
            }
        });
    }

    if (videoFile) {
        videoFile.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                handleFileSelect(e.target.files[0]);
            }
        });
    }

    if (uploadForm) {
        uploadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('videoTitleInput').value;
            const description = document.getElementById('videoDescInput').value;
            const category = document.getElementById('categorySelect').value;
            alert(`Video "${title}" uploaded successfully!\nCategory: ${category}`);
            window.location.href = 'index.html';
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleFileSelect };
}
