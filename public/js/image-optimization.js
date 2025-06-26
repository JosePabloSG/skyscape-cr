// Image optimization script for better performance
(function () {
  'use strict';

  // Lazy loading for images that don't have loading="lazy"
  function initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Add loading placeholders for better UX
  function addImagePlaceholders() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.complete) {
        img.style.backgroundColor = '#f0f0f0';
        img.style.minHeight = '200px';

        img.addEventListener('load', () => {
          img.style.backgroundColor = '';
          img.style.minHeight = '';
        });
      }
    });
  }

  // Preload critical images
  function preloadCriticalImages() {
    const criticalImages = [
      '/src/assets/Hero.png',
      '/src/assets/background.svg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLazyLoading();
      addImagePlaceholders();
      preloadCriticalImages();
    });
  } else {
    initLazyLoading();
    addImagePlaceholders();
    preloadCriticalImages();
  }

  // Add resize observer for responsive images
  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        const img = entry.target;
        const width = entry.contentRect.width;

        // Adjust image quality based on container size
        if (img.dataset.srcset && width < 768) {
          // Use smaller image on mobile
          const sources = img.dataset.srcset.split(',');
          const smallestSource = sources[0].trim().split(' ')[0];
          if (img.src !== smallestSource) {
            img.src = smallestSource;
          }
        }
      });
    });

    document.querySelectorAll('img[data-srcset]').forEach(img => {
      resizeObserver.observe(img);
    });
  }
})();
