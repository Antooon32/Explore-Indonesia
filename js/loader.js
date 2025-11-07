document.addEventListener('DOMContentLoaded', () => {
    const preloadElement = document.querySelector('.preload');
    const body = document.body;

    if (preloadElement) {
        preloadElement.classList.add('preload__animation');
        preloadElement.addEventListener('animationend', function handler() {
            body.classList.remove('no-scroll');
            preloadElement.removeEventListener('animationend', handler);

        }, { once: true });

    } else {
        body.classList.remove('no-scroll');
    }
});