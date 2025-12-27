document.addEventListener("DOMContentLoaded", function () {
    loadVideos();
    setupEventListeners();
});

// Sample data - In real app, this would come from backend/API
let videos = [
    {
        id: 1,
        title: "Ramadan Preparation Guide",
        videoUrl: "assets/sample-video-1.mp4",
        status: "active",
        dateAdded: "2025-03-01"
    },
    {
        id: 2,
        title: "How to Perform Wudu Correctly",
        videoUrl: "assets/sample-video-2.mp4",
        status: "inactive",
        dateAdded: "2025-02-28"
    },
    {
        id: 3,
        title: "Friday Khutbah - Patience in Islam",
        videoUrl: "assets/sample-video-3.mp4",
        status: "active",
        dateAdded: "2025-02-25"
    }
];

// Load videos into table
function loadVideos() {
    const tbody = document.getElementById('videosTableBody');
    tbody.innerHTML = '';

    videos.forEach(video => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${video.id}</td>
            <td>
                <video class="video-thumbnail" muted>
                    <source src="${video.videoUrl}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </td>
            <td class="video-title" title="${video.title}">${video.title}</td>
            <td>
                <div class="d-flex flex-column">
                    <span class="small text-muted">${video.videoUrl.split('/').pop()}</span>
                    <div class="video-controls">
                        <button class="btn btn-sm btn-outline-secondary btn-play" data-url="${video.videoUrl}">
                            <i class="fas fa-play"></i> Play
                        </button>
                        <a href="${video.videoUrl}" class="btn btn-sm btn-outline-info" download>
                            <i class="fas fa-download"></i>
                        </a>
                    </div>
                </div>
            </td>
            <td>
                <span class="badge ${video.status === 'active' ? 'bg-success' : 'bg-secondary'}">
                    ${video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                </span>
            </td>
            <td class="table-actions">
                <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${video.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${video.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Setup all event listeners
function setupEventListeners() {
    // Add video button
    document.getElementById('saveVideoBtn').addEventListener('click', addVideo);
    
    // Update video button
    document.getElementById('updateVideoBtn').addEventListener('click', updateVideo);
    
    // Delete video button
    document.getElementById('confirmDeleteBtn').addEventListener('click', deleteVideo);
    
    // Video file change preview
    document.getElementById('videoFile').addEventListener('change', function(e) {
        previewVideo(e.target.files[0], 'videoPreview', 'videoPlaceholder');
    });
    
    document.getElementById('editVideoFile').addEventListener('change', function(e) {
        previewVideo(e.target.files[0], 'newVideoPreview', 'newVideoPlaceholder');
    });
    
    // Play button events (delegated)
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-play')) {
            const videoUrl = e.target.closest('.btn-play').dataset.url;
            playVideoInModal(videoUrl);
        }
        
        if (e.target.closest('.btn-edit')) {
            const videoId = parseInt(e.target.closest('.btn-edit').dataset.id);
            openEditModal(videoId);
        }
        
        if (e.target.closest('.btn-delete')) {
            const videoId = parseInt(e.target.closest('.btn-delete').dataset.id);
            openDeleteModal(videoId);
        }
    });
}

// Add new video
function addVideo() {
    const title = document.getElementById('videoTitle').value.trim();
    const fileInput = document.getElementById('videoFile');
    const status = document.getElementById('videoStatus').value;
    
    if (!title) {
        alert('Please enter a video title');
        return;
    }
    
    if (!fileInput.files[0]) {
        alert('Please select a video file');
        return;
    }
    
    // In real app, you would upload the file to server
    // For demo, we'll create a local URL
    const videoUrl = URL.createObjectURL(fileInput.files[0]);
    
    const newVideo = {
        id: videos.length > 0 ? Math.max(...videos.map(v => v.id)) + 1 : 1,
        title: title,
        videoUrl: videoUrl,
        status: status,
        dateAdded: new Date().toISOString().split('T')[0]
    };
    
    videos.push(newVideo);
    loadVideos();
    
    // Close modal and reset form
    const modal = bootstrap.Modal.getInstance(document.getElementById('addVideoModal'));
    modal.hide();
    document.getElementById('addVideoForm').reset();
    document.getElementById('videoPreview').style.display = 'none';
    document.getElementById('videoPlaceholder').style.display = 'block';
    
    alert('Video added successfully!');
}

// Open edit modal
function openEditModal(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    document.getElementById('editVideoId').value = video.id;
    document.getElementById('editVideoTitle').value = video.title;
    document.getElementById('editVideoStatus').value = video.status;
    
    // Set current video preview
    const previewVideo = document.getElementById('currentVideoPreview');
    previewVideo.src = video.videoUrl;
    previewVideo.style.display = 'block';
    
    document.getElementById('currentVideoInfo').innerHTML = `
        <strong>Current:</strong> ${video.videoUrl.split('/').pop()}<br>
        <small>Click play to preview</small>
    `;
    
    // Reset new video preview
    document.getElementById('newVideoPreview').style.display = 'none';
    document.getElementById('newVideoPlaceholder').style.display = 'block';
    
    const modal = new bootstrap.Modal(document.getElementById('editVideoModal'));
    modal.show();
}

// Update video
function updateVideo() {
    const videoId = parseInt(document.getElementById('editVideoId').value);
    const title = document.getElementById('editVideoTitle').value.trim();
    const fileInput = document.getElementById('editVideoFile');
    const status = document.getElementById('editVideoStatus').value;
    
    if (!title) {
        alert('Please enter a video title');
        return;
    }
    
    const videoIndex = videos.findIndex(v => v.id === videoId);
    if (videoIndex === -1) return;
    
    // Update video data
    videos[videoIndex].title = title;
    videos[videoIndex].status = status;
    
    // If new file is selected, update the URL
    if (fileInput.files[0]) {
        const newVideoUrl = URL.createObjectURL(fileInput.files[0]);
        videos[videoIndex].videoUrl = newVideoUrl;
    }
    
    loadVideos();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editVideoModal'));
    modal.hide();
    
    alert('Video updated successfully!');
}

// Open delete modal
function openDeleteModal(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (!video) return;
    
    document.getElementById('deleteVideoId').textContent = video.id;
    document.getElementById('deleteVideoTitle').textContent = video.title;
    document.getElementById('deleteVideoStatus').textContent = video.status;
    
    // Store video ID for deletion
    document.getElementById('confirmDeleteBtn').dataset.videoId = videoId;
    
    const modal = new bootstrap.Modal(document.getElementById('deleteVideoModal'));
    modal.show();
}

// Delete video
function deleteVideo() {
    const videoId = parseInt(document.getElementById('confirmDeleteBtn').dataset.videoId);
    
    videos = videos.filter(v => v.id !== videoId);
    loadVideos();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteVideoModal'));
    modal.hide();
    
    alert('Video deleted successfully!');
}

// Preview video before upload
function previewVideo(file, videoElementId, placeholderId) {
    if (!file) return;
    
    const video = document.getElementById(videoElementId);
    const placeholder = document.getElementById(placeholderId);
    
    if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        video.src = url;
        video.style.display = 'block';
        placeholder.style.display = 'none';
    } else {
        alert('Please select a valid video file');
    }
}

// Play video in modal
function playVideoInModal(videoUrl) {
    const modalHTML = `
        <div class="modal fade" id="playVideoModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Video Preview</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <video controls autoplay style="width: 100%;">
                            <source src="${videoUrl}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if any
    const existingModal = document.getElementById('playVideoModal');
    if (existingModal) existingModal.remove();
    
    // Add new modal
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('playVideoModal'));
    modal.show();
    
    // Remove modal when closed
    document.getElementById('playVideoModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}