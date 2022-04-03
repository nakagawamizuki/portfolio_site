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