document.addEventListener('DOMContentLoaded', () => {
    const bnrSlider = document.querySelector('.js-bnr-slider');

    new Swiper(bnrSlider, {
        slidesPerView: 1,
        autoHeight: true,
    })
})