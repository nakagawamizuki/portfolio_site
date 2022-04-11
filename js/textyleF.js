/*
 * TextyleFLIP.js - v2.0
 * https://github.com/mycreatesite/Textyle.js
 * MIT licensed
 * Copyright (C) 2019 ma-ya's CREATE
 * https://myscreate.com
 */
 /*
　Minimalistic Form. 
　by: Matheus Marsiglio
　*/
 /* global jQuery */
 (function($){
    $.fn.textyleF = function(options){
        var target = this;
        var targetTxt = target.contents();
        var defaults = {
            duration : 1000,
            delay : 150,
            easing : 'ease',
            callback : null
        };
        var setting = $.extend(defaults, options);
        // split txt & wrap txt by span
        targetTxt.each(function(){
                var texts = $(this);
                if(this.nodeType === 3){
                        mkspn(texts);
                }
        });
        function mkspn(texts){
            texts.replaceWith(texts.text().replace(/(\S)/g,'<span>$1</span>'));
        }
        // txt animation
        return this.each(function(i){
            var child = target.children('span');
            target.css('opacity',1);
            child.css('display','inline-block');
            child.each(function(i){
                $(this).delay(setting.delay*i)
                .queue(function(next) {
                    $(this).css({
                        transform : 'rotateY(0deg) rotateX(0deg)',
                        opacity : 1,
                        transitionDuration : setting.duration + 'ms',
                        transitionTimingFunction : setting.easing
                    })
                    next();
                });
                if(typeof setting.callback === 'function'){
                    $(this).on('transitionend', function() {
                        setting.callback.call(this);
                    });
                }
            });
        });
        validate(){
            $('span').remove();
            
            let flag = true;
            if(this.name === ''){
                $('input[id="name"]').after($('<span>', {text: '名前を入力してください'}))；
                flag = false;
            }
            
            if(this.email === ''){
                $('input[id="email"]').after($('<span>', {text: '正しく入力してください'}));
            }
            $('span').addClass('error');
            return flag;
        }
    };
    
    let image_witdh;
    let image_height;
    let image_ratio;
    let center_x;
    let center_y;
    
    let init_line_length;
    
    $(function(){
        show_image_info();
        init_line_length = $('p').width();
        $('a').on('click', function() {
            const adjust = 0;
            const speed = 1000;
            const href = $(this).attr("href");
            console.log('href: ' + href);
            const goal = $(href);
            console.log('goal offset_left: ' + goal.offset().left + 'px');
            console.log('goal offset_top: ' + goal.offset().top + 'px');
            
            const position_top = goal.offset().top + adjust;
            $('body, html').animate({scrollTop: position_top}, speed, 'swing');
            
            return false;
        });
    });
 }(　jQuery ));