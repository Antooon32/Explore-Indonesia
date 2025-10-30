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
        
        // Текущий индекс отображаемого слайда (от 0 до realSlidesCount - 1)
        this.currentIndex = 0; 

        this.init();
    }

    /**
     * Инициализация слайдера: установка слушателей и начальное состояние.
     */
    init() {
        this.renderPagination();
        this.attachEvents();
        this.updateSlider(this.currentIndex, false); // Начальная отрисовка без анимации
    }

    /**
     * Рендеринг точек пагинации и установка начального состояния.
     */
    renderPagination() {
        // Предполагаем, что HTML пагинации уже есть, как в предоставленном коде, 
        // но мы обновляем классы и data-атрибуты для корректной работы.
        this.paginationDots = Array.from(this.paginationContainer.querySelectorAll('.slider-pagination-list__item'));

        this.paginationDots.forEach((dot, index) => {
            // Убедимся, что data-атрибут правильный
            dot.setAttribute('data-slide-to', index); 
            dot.addEventListener('click', () => this.goToSlide(index));
        });
    }

    /**
     * Установка слушателей событий для кнопок.
     */
    attachEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.moveSlide(-1));
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.moveSlide(1));
        }
    }

    /**
     * Сдвиг слайдера на заданное количество позиций.
     * @param {number} direction - Направление сдвига: -1 (назад) или 1 (вперед).
     */
    moveSlide(direction) {
        let newIndex = this.currentIndex + direction;

        // Обработка циклического переключения
        if (newIndex < 0) {
            newIndex = this.realSlidesCount - 1;
        } else if (newIndex >= this.realSlidesCount) {
            newIndex = 0;
        }

        this.goToSlide(newIndex);
    }

    /**
     * Переход к конкретному слайду.
     * @param {number} index - Индекс слайда, к которому нужно перейти.
     */
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider(this.currentIndex, true);
    }

    /**
     * Обновление отображения слайдера (сдвиг и пагинация).
     * @param {number} index - Индекс активного слайда.
     * @param {boolean} animate - Использовать ли CSS-transition.
     */
    updateSlider(index, animate = true) {
        // Устанавливаем transition, если animate = true
        this.sliderList.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
        
        // Расчет смещения: -100% * индекс текущего слайда
        const offset = -23 * index;
        this.sliderList.style.transform = `translateX(${offset}%)`;

        // Обновление пагинации
        this.paginationDots.forEach((dot, dotIndex) => {
            dot.classList.remove('slider-pagination-list__item--active');
            if (dotIndex === index) {
                dot.classList.add('slider-pagination-list__item--active');
            }
        });
    }
}

// Инициализация слайдера после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Используем селектор '.slider' для инициализации
    new SimpleSlider('.slider'); 
});