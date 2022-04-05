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
		targetTxt.each(function(){
			var texts = $(this);
			if(this.nodeType === 3){
				mkspn(texts);
			}
		});
		function mkspn(texts){
			texts.replaceWith(texts.text().replace(/(\S)/g,'<span>$1</span>'));
		}
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
	};
}(jQuery));