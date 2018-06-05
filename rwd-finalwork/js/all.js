$(document).ready(function () {
    $('.showMenu').click(function (e) {
        e.preventDefault();
        $('body').toggleClass('open');
    });
});
$(document).ready(function () {
    $('#top-btn').click(function () {
        $('html,body').animate({ scrollTop: '0px' }, 800);
    });
});