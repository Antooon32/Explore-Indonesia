document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.getting-list__button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            let description = button.previousElementSibling;

            if (description && description.classList.contains('getting-list__description')) {
                
                const isOpen = description.classList.contains('is-open');

                description.classList.toggle('is-open');

                if (isOpen) {
                    button.textContent = 'Show more';
                    button.setAttribute('aria-expanded', 'false'); 
                } else {
                    button.textContent = 'Show less';
                    button.setAttribute('aria-expanded', 'true');
                }}
        });
    });
});