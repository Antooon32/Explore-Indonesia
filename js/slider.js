class SimpleSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) {
      console.error(`Slider element not found for selector: ${selector}`);
      return;
    }

    this.sliderList = this.slider.querySelector(".slider-list");
    this.items = Array.from(this.slider.querySelectorAll(".slider-list__item"));
    this.paginationContainer = this.slider.querySelector(
      "[data-pagination-container]"
    );
    this.prevBtn = document.querySelector("[data-slider-prevBtn]");
    this.nextBtn = document.querySelector("[data-slider-nextBtn]");
    this.paginationDots = [];

    this.realSlidesCount = 4;

    this.currentIndex = 0;

    this.lightboxModal = null;
    this.lightboxImage = null;
    this.boundHandleKeydown = this.handleKeydown.bind(this); 

    this.init();
  }

  init() {
    this.renderPagination();
    this.attachEvents();
    this.createLightboxModal(); 
    this.updateSlider(this.currentIndex, false);
  }

  createLightboxModal() {
    this.lightboxModal = document.createElement('div');
    this.lightboxModal.classList.add('lightbox-modal');
    this.lightboxModal.addEventListener('click', this.closeLightbox.bind(this)); 

    this.lightboxImage = document.createElement('img');
    this.lightboxImage.classList.add('lightbox-modal__content');
    
    this.lightboxImage.addEventListener('click', (e) => e.stopPropagation()); 

    this.lightboxModal.appendChild(this.lightboxImage);
    document.body.appendChild(this.lightboxModal);
  }

  openLightbox(imageSrc) {
    this.lightboxImage.src = imageSrc; 
    this.lightboxModal.classList.add('lightbox-modal--visible');
    document.body.style.overflow = 'hidden'; 
    document.addEventListener('keydown', this.boundHandleKeydown); 
  }

  closeLightbox(e) {
    if (!e || e.target === this.lightboxModal) {
        this.lightboxModal.classList.remove('lightbox-modal--visible');
        document.body.style.overflow = ''; 
        document.removeEventListener('keydown', this.boundHandleKeydown); 
    }
  }

  handleKeydown(e) {
      if (e.key === 'Escape' && this.lightboxModal.classList.contains('lightbox-modal--visible')) {
          this.closeLightbox();
      }
  }

  attachEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => this.moveSlide(-1));
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => this.moveSlide(1));
    }
    
    this.items.forEach(item => {
        const image = item.querySelector('.slider-list__item__content img');
        if (image) {
            image.addEventListener('click', (e) => {
                e.preventDefault(); 
                this.openLightbox(image.src); 
            });
        }
    });
  }

  renderPagination() {
    this.paginationDots = Array.from(
      this.paginationContainer.querySelectorAll(".slider-pagination-list__item")
    );

    this.paginationDots.forEach((dot, index) => {
      dot.setAttribute("data-slide-to", index);
      dot.addEventListener("click", () => this.goToSlide(index));
    });
  }

  moveSlide(direction) {
    let newIndex = this.currentIndex + direction;

    if (newIndex < 0) {
      newIndex = this.realSlidesCount - 1;
    } else if (newIndex >= this.realSlidesCount) {
      newIndex = 0;
    }

    this.goToSlide(newIndex);
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlider(this.currentIndex, true);
  }

  updateSlider(index, animate = true) {
    this.sliderList.style.transition = animate
      ? "transform 0.5s ease-in-out"
      : "none";

    const viewportWidth = window.innerWidth;

    let offset;

    if (viewportWidth >= 1400) {
      offset = -25 * index;
        } else {
      offset = -23 * index;
    }
    this.sliderList.style.transform = `translateX(${offset}%)`;

    this.paginationDots.forEach((dot, dotIndex) => {
      dot.classList.remove("slider-pagination-list__item--active");
      if (dotIndex === index) {
        dot.classList.add("slider-pagination-list__item--active");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new SimpleSlider(".slider");
});
