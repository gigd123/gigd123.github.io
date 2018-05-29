var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
$(document).ready(function () {
    $(function () {
        $(window).scroll(function () {
            var scrollVal = $(this).scrollTop();
            if (scrollVal >= 160) {
                $('.nav-bar').addClass('fixed-top');
            } else {
                $('.nav-bar').removeClass('fixed-top');
            }
        });
    });
});