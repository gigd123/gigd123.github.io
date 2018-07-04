/*swipe.js */
var swiper = new Swiper('.swiper-container', {
    spaceBetween: 30,
    centeredSlides: true,
    speed: 2000,
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
/*individual*/
$(document).ready(function () {
    $(function () {
        /*window滾至160以上，添加fixed效果*/
        $(window).scroll(function () {
            var scrollVal = $(this).scrollTop();
            if (scrollVal >= 160) {
                $('.nav-bar').addClass('fixed-top');

            } else {
                $('.nav-bar').removeClass('fixed-top');
            }
        });
        /*navbar連結滑動效果*/
        $('.scrollTop').click(function (e) {
            e.preventDefault();
            var target = $(this).attr('href');
            var targetPos = $(target).offset().top;
            $('html, body').animate({ scrollTop: targetPos }, 1500);
        });
    });
});
/*aos*/
AOS.init();
/*anime.js*/
$(window).scroll(function () {
    anime.speed = .3;
    var windowHeght = $(window).scrollTop();
    var window_h = $(window).height();
    var aboutH3 = $('.aboutUs-intro h3').offset().top;
    var aboutH3_h = aboutH3 - window_h;
    if (windowHeght >= aboutH3_h) {
        var functionBasedDuration = anime({
            targets: '.aboutUs-intro p span',
            translateX: 1000,
            direction: 'alternate',
            loop: true,
            duration: function (el, i, l) {
                return 1000 + (i * 1000);
            }
        });
    } else {
        var functionBasedDuration = anime({
            targets: '.aboutUs-intro p span',
            translateX: -1000,
            direction: 'alternate',
            loop: true,
            duration: function (el, i, l) {
                return 1000 + (i * 1000);
            }
        });
    }
});