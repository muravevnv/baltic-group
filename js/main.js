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
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            }
        }
    })
})