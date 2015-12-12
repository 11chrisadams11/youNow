$(function(){
    $('body')
        .on('click', '.card.news>.innerNews', function(){
            if($(this)){}
            if($(this).find('.newsImage').data('size') === 75){
                $(this)
                    .find('.newsImage').data('size', 150)
                    .closest('.card').find('.newsText').show(1).animate({'line-height': 18, 'opacity': 100})
            } else if($(this).find('.newsImage').data('size') === 150){
                $(this)
                    .find('.newsImage').data('size', 75)
                    .closest('.card').find('.newsText').animate({'line-height': 0, 'opacity': 0}).hide(1)
            }

        })
        .on('click', '.themeButton', function(){
            var t = $(this).data('theme');

            var bgColors = {default: '#ffffff', dark: '#353535', blue: '#e4e4e4', orange: '#fceecf', simple: '#ffffff', random: rC()},
                headerColors = {default: '#e3eeee', dark: '#1f1f1f', blue: '#3f51b5', orange: '#e6901c', simple: '#ffffff', random: rC()},
                bgFontColors = {default: '#000000', dark: 'whitesmoke', blue: '#282828', orange: '#282828', simple: '#000000', random: rC()},
                headerFontColors = {default: '#000000', dark: 'whitesmoke', blue: '#FFFFFF', orange: '#212121', simple: '#000000', random: rC()},
                shadow = {default: '0 0 0 0', dark: '0 0 0 0', blue: '0 3px 8px rgba(0,0,0,0.5)', orange: '0 3px 8px rgba(0,0,0,0.5)', simple: '0 0 0 0', random: rC()};

            if($(this).data('theme') === 'default'){
                $('body').animate({'background-color': bgColors[t], color: bgFontColors[t]});
                $('#header').animate({'background-color': headerColors[t], color: headerFontColors[t], 'box-shadow': shadow[t]}, function(){
                    $('#theme').remove();
                });
            } else {
                $('body').animate({'background-color': bgColors[t], color: bgFontColors[t]}).css({});
                $('#header').animate({'background-color': headerColors[t], color: headerFontColors[t], 'box-shadow': shadow[t]}, function(){
                    $('#theme').remove();
                    $('head').append('<link href="css/themes/' + t + '.css" rel="stylesheet" id="theme" data-theme="' + t + '" />')
                });

            }
        });

    function rC(){
        return '#'+Math.floor(Math.random()*16777215).toString(16);
    }

    $('#settingsOkButton').hover(function(){
        if($(this).attr('class') === 'glyphicon glyphicon-cog'){
            $('#logout').fadeIn(400)
        }
    }, function(){
        $('#logout').delay(1000).fadeOut(500)
    });

    $('#logout').hover(function(){
        $(this).stop(true,true).show()
    }, function(){
        $(this).delay(200).fadeOut(500)
    })

});

