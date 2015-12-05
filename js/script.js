$(function($scope){
    var $themeNow;
    $('body')
        .on('click', '.card.news', function(){
            if($(this).find('.newsImage').data('size') === 75){
                $(this)
                    .find('.newsImage').data('size', 150)
                    //.find('img').animate({'height': 150})
                    .closest('.card').find('.newsText').show(1).animate({'line-height': 18, 'opacity': 100})
            } else if($(this).find('.newsImage').data('size') === 150){
                $(this)
                    .find('.newsImage').data('size', 75)
                    //.find('img').animate({'height': 75})
                    .closest('.card').find('.newsText').animate({'line-height': 0, 'opacity': 0}).hide(1)
            }

        })
        .on('click', '.themeButton', function(){
            var t = $(this).data('theme');
            if($(this).data('theme') === 'default'){
                $('#theme').remove()
            } else {
                $('#theme').remove();
                $('head').append('<link href="css/themes/' + t + '.css" rel="stylesheet" id="theme" data-theme="' + t + '" />')
            }
        })
});

