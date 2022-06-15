
window.onload = (function () {


    var $html = $('html'),
        $preloader = $('.preloader'),
        $currLang = $('.curr_lang'),
        lang = localStorage.lang,
        langList = ['de', 'pl', 'en', 'jp', 'ru', 'default'];

    if (!lang) {
        // default lang
        var countryToLang = {
            'en' : 'en',
            'pl' : 'pl',
            'de' : 'de',
            'jp' : 'jp',
            'ru' : 'ru',
            'default' : 'ru'
        };
        var country = $html.attr('data-country'),
            lang = countryToLang[country] || countryToLang['default'];
        localStorage.lang = lang;
    }

    langList.forEach((element) => {
        $html.removeClass(element).addClass(lang);
    });

    $('.lang_list_item[data-lang="'+lang+'"]')
        .addClass('curr')
        .siblings()
        .removeClass('curr');
    $currLang.html( $('.lang_list_item[data-lang="'+lang+'"]').html() );

    setTimeout(function () {
        $preloader.fadeOut();
        setTimeout(function () {
            $html.addClass('hide');
        }, 200);
    }, 200);


});



$(document).ready(function () {


    var $langSwitcher = $('.lang_switcher'),
        $langList = $('.lang_list'),
        $langListItem = $('.lang_list_item'),
        $html = $('html'),
        $preloader = $('.preloader'),
        $currLang = $('.curr_lang');

    $langSwitcher.click(function () {
        $langList.toggleClass('act');
    });

    $langListItem.click(function () {
        $preloader.fadeIn();
        $html.removeClass('hide');
        setTimeout(function () {
            $preloader.fadeOut();
            $html.addClass('hide');
        }, 200);
        let lang = $(this).data('lang');
        let langs = $('.lang_list_item').map((i, el) => $(el).data('lang')).toArray().join(" ");
        $html.removeClass(langs).addClass(lang);
        localStorage.lang = lang;
        $('.lang_list_item[data-lang="'+lang+'"]')
            .addClass('curr')
            .siblings()
            .removeClass('curr');
        $currLang.html( $(this).html() );


    });

    $(document).mouseup(function (e){
        if (!$langSwitcher.is(e.target)
            && $langSwitcher.has(e.target).length === 0) {
            $langList.removeClass('act');
        }
    });

    if( device.desktop() ) {
        parallaxInit();
    }

});

function parallaxInit() {

    var currentWidth = $(window).width();
    var delta = ($(document).width() - currentWidth)/2;
    $('.page').mousemove(function(e){

        var x1 = -((e.pageX) - currentWidth / 2)/80;
        var x2 = -((e.pageX) - currentWidth / 2)/60;

        $('.bg_1_img').css({'left':  delta + x1 + 'px'});
        $('.bg_2_img').css({'right':  delta + x2 + 'px'});

    });
}

$(window).resize(function(){
    parallaxInit();
});




