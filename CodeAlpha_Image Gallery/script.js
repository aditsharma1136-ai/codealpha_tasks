document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const images = Array.from(gallery.querySelectorAll('img'));
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentIndex = 0;
    let filteredImages = images; // Initially all images
    
    // Open lightbox
    gallery.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            currentIndex = filteredImages.indexOf(e.target);
            showLightbox(currentIndex);
        }
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });
    
    // Navigation
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
        showLightbox(currentIndex);
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % filteredImages.length;
        showLightbox(currentIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'Escape') closeLightbox();
        }
    });
    
    // Filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (filter === 'all') {
                filteredImages = images;
            } else {
                filteredImages = images.filter(img => img.getAttribute('data-category') === filter);
            }
            
            updateGallery();
        });
    });
    
    function showLightbox(index) {
        lightboxImg.src = filteredImages[index].src;
        lightboxImg.alt = filteredImages[index].alt;
        lightbox.style.display = 'flex';
    }
    
    function closeLightbox() {
        lightbox.style.display = 'none';
    }
    
    function updateGallery() {
        images.forEach(img => {
            if (filteredImages.includes(img)) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    }
});