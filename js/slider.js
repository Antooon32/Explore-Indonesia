class SimpleSlider {
    constructor(selector) {
        this.slider = document.querySelector(selector);
        if (!this.slider) {
            console.error(`Slider element not found for selector: ${selector}`);
            return;
        }

        this.sliderList = this.slider.querySelector('.slider-list');
        this.items = Array.from(this.slider.querySelectorAll('.slider-list__item'));
        this.paginationContainer = this.slider.querySelector('[data-pagination-container]');
        this.prevBtn = document.querySelector('[data-slider-prevBtn]');
        this.nextBtn = document.querySelector('[data-slider-nextBtn]');
        this.paginationDots = []; 
        
        this.realSlidesCount = 4; 
        
        this.currentIndex = 0; 

        this.init();
    }

    init() {
        this.renderPagination();
        this.attachEvents();
        this.updateSlider(this.currentIndex, false); 
    }

    renderPagination() {
        this.paginationDots = Array.from(this.paginationContainer.querySelectorAll('.slider-pagination-list__item'));

        this.paginationDots.forEach((dot, index) => {
            dot.setAttribute('data-slide-to', index); 
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    attachEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.moveSlide(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.moveSlide(1));
        }
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
        this.sliderList.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        
        const offset = -23 * index;
        this.sliderList.style.transform = `translateX(${offset}%)`;

        this.paginationDots.forEach((dot, dotIndex) => {
            dot.classList.remove('slider-pagination-list__item--active');
            if (dotIndex === index) {
                dot.classList.add('slider-pagination-list__item--active');
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new SimpleSlider('.slider'); 
});