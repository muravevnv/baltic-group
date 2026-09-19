document.addEventListener('DOMContentLoaded', () => {
    const bnrSlider = document.querySelector('[data-slider="our-life"]');

    new Swiper(bnrSlider, {
        slidesPerView: 1,
        autoHeight: true,
        spaceBetween: 6,
        navigation: {
            prevEl: '[data-slider-prev="our-life"]',
            nextEl: '[data-slider-next="our-life"]'
        },
        pagination: {
            el: '[data-slider-fraction="our-life"]',
            type: 'fraction',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            }
        }
    })

    Fancybox.bind("[data-fancybox]", {});

    function initTabs() {
        document.addEventListener('click', (event) => {
            const button = event.target.closest('[data-tab]');

            if (!button) return;

            const tabs = button.closest('[data-tabs]');

            if (!tabs) return;

            const tabName = button.dataset.tab;

            const buttons = tabs.querySelectorAll('[data-tab]');
            const contents = tabs.querySelectorAll('[data-tab-content]');

            buttons.forEach((item) => {
                item.classList.toggle(
                    'is-selected',
                    item.dataset.tab === tabName
                );
            });

            contents.forEach((item) => {
                item.classList.toggle(
                    'is-selected',
                    item.dataset.tabContent === tabName
                );
            });
        });
    }

    function initFormValidation() {
        document.addEventListener('submit', (event) => {
            const form = event.target.closest('.callback-popup__form');

            if (!form) return;

            event.preventDefault();

            const requiredFields = form.querySelectorAll('[data-required]');

            let hasErrors = false;

            requiredFields.forEach((field) => {
                const isValid = validateField(field);

                setFieldError(field, !isValid);

                if (!isValid) {
                    hasErrors = true;
                }
            });

            if (hasErrors) {
                const firstError = form.querySelector(
                    '.form-group.is-error [data-required], ' +
                    '.form-checkbox.is-error [data-required]'
                );

                firstError?.focus();

                return;
            }

            // Здесь отправка формы
            console.log('Форма валидна', form);
        });


        document.addEventListener('input', (event) => {
            const field = event.target.closest('[data-required]');

            if (!field) return;

            if (validateField(field)) {
                setFieldError(field, false);
            }
        });


        document.addEventListener('change', (event) => {
            const field = event.target.closest('[data-required]');

            if (!field) return;

            if (validateField(field)) {
                setFieldError(field, false);
            }
        });
    }


    function validateField(field) {
        if (field.type === 'checkbox') {
            return field.checked;
        }

        if (field.type === 'radio') {
            return field.checked;
        }

        if (field.type === 'file') {
            return field.files.length > 0;
        }

        if (field.type === 'email') {
            const value = field.value.trim();

            if (!value) return false;

            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }

        return field.value.trim() !== '';
    }


    function setFieldError(field, hasError) {
        const group = field.closest(
            '.form-group, .form-checkbox'
        );

        if (!group) return;

        group.classList.toggle('is-error', hasError);
    }


    function initFileInput() {
        document.addEventListener('change', (event) => {
            const input = event.target.closest('.form-file__input');

            if (!input) return;

            const fileWrapper = input.closest('.form-file');

            if (!fileWrapper) return;

            const fileName = fileWrapper.querySelector(
                '.form-file__control-file'
            );

            const file = input.files[0];

            if (!file) {
                if (fileName) {
                    fileName.textContent = 'Файл не выбран';
                }

                return;
            }

            if (fileName) {
                fileName.textContent = file.name;
            }
        });
    }

    initTabs();
    initFileInput();
    initFormValidation();

    const menu = document.querySelector('[data-menu="panel"]');
    const menuBurger = document.querySelector('[data-menu="burger"]');
    const menuClose = document.querySelector('[data-menu="close"]');

    if (menu && menuBurger && menuClose) {
        menuBurger.addEventListener('click', () => {
            menu.classList.add('is-open');
        })

        menuClose.addEventListener('click', () => {
            menu.classList.remove('is-open');
        })
    }

    const whyUsMoreBtn = document.querySelector('.why-us__show-more');
    const whyUsItems = document.querySelector('.why-us__items');

    if(whyUsItems && whyUsMoreBtn) {
        whyUsMoreBtn.addEventListener('click', () => {
            whyUsItems.classList.toggle('is-open');
        })
    }

    const employeeItems = document.querySelectorAll('.employee__item');

    employeeItems.forEach((item) => {
        const openBtn = item.querySelector('.employee__item-head-btn');
        const collapseBtn = item.querySelector(
            '.employee__item-details-collapse-btn'
        );
        const details = item.querySelector('.employee__item-details');

        if (!openBtn || !details) return;

        const open = () => {
            if (item.classList.contains('is-open')) return;

            item.classList.add('is-open');

            openBtn.setAttribute('aria-expanded', 'true');

            details.style.height = '0px';

            requestAnimationFrame(() => {
                details.style.height = `${details.scrollHeight}px`;
            });

            const onTransitionEnd = (event) => {
                if (event.propertyName !== 'height') return;

                if (item.classList.contains('is-open')) {
                    details.style.height = 'auto';
                }

                details.removeEventListener('transitionend', onTransitionEnd);
            };

            details.addEventListener('transitionend', onTransitionEnd);
        };

        const close = () => {
            if (!item.classList.contains('is-open')) return;


            details.style.height = `${details.scrollHeight}px`;

            details.offsetHeight;

            item.classList.remove('is-open');

            openBtn.setAttribute('aria-expanded', 'false');

            requestAnimationFrame(() => {
                details.style.height = '0px';
            });
        };

        const toggle = () => {
            if (item.classList.contains('is-open')) {
                close();
            } else {
                open();
            }
        };

        openBtn.addEventListener('click', toggle);

        collapseBtn?.addEventListener('click', close);
    });
})