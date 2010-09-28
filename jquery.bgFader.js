/*
 * jQuery bgFader plugin v0.2.0, 2010-09-27
 * Only tested with jQuery 1.4.1 (early versions - YMMV)
 * 
 *   http://jdeerhake.com/bgFader.php
 *   http://plugins.jquery.com/project/bgFader
 *
 *
 * Copyright (c) 2010 John Deerhake
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
jQuery.fn.bgFader = function (userargs) {
	var defs = {
		type : 'out',  //in, out, cross
		duration : 300, //accepts jQuery defined strings (eg slow, fast) or ms
		newBg : '', //new aruments for CSS 'background:' short hand declaration
		easing : 'linear', //linear or swing (unless you have the jQuery easing plugin installed)
		callback : '' //callback function
	}
	var args = jQuery.extend({}, defs, userargs);
	if(args.type === 'in') {
		defs.fadeTo = '1'; //0 <-> 1
	} else if(args.type === 'out' || args.type === 'cross') {
		defs.fadeTo = '0';
	}
	args = jQuery.extend({}, defs, userargs);
	return this.each(function () {
		var obj = jQuery(this),
			z = obj.css('z-index'),
			holder = jQuery('<div></div>').css('position', 'relative'),
			underlay = jQuery('<div></div>'),
			oldBg = jQuery('<div></div>');
		obj.wrap(holder);
		if(z == 'auto') { z = 0; }
		underlay.css({
			'z-index' : z - 1,
			'position' : 'absolute',
			'top' : 0,
			'left' : 0,
			'width' : obj.css('width'),
			'height' : obj.css('height'),
		});

		switch(args.type) {
			case 'out':
				underlay
				    .getBgFrom(obj)
				    .css('opacity', obj.css('opacity'))
				    .insertBefore(obj);
				obj.css('background', 'none');
			break;
			case 'in':
				underlay.css({
					'background' : args.newBg,
					'opacity' : 0
				}).insertBefore(obj);
			break;
			case 'cross':
				underlay
				    .getBgFrom(obj)
				    .css('opacity', obj.css('opacity'))
				    .insertBefore(obj);
			    var crossTo = underlay.clone().css({
			        'background' : args.newBg,
			        'opacity' : 0,
			        'z-index' : z - 2
			    }).insertBefore(obj);
                obj.css('background', 'none');
			break;
		}

		underlay.animate({
			'opacity' : args.fadeTo
		},{
		    'duration' : args.duration,
		    'easing' : args.easing,
		    'complete' : cleanup,
		    'step' : function(o) {
		        crossTo.css("opacity", 1 - o);
		    }
		});
		
		function cleanup() {
			var holder = obj.parent();
			if(args.type === 'in' && args.fadeTo < 1) {
				//Do nothing. Can't clean up divs because partial opacity.
			} else if ((args.type === 'out' || args.type === "cross") && args.fadeTo > 0) {
				//Again do nothing.
			} else if (args.type === 'in' || args.type === 'cross') {
				obj.css('background', args.newBg);
				underlay.remove();
				obj.insertBefore(holder);
				holder.remove();
			} else { //wet
				underlay.remove();
				obj.insertBefore(holder);
				holder.remove();
			}
			if(typeof(args.callback) === 'function') {
				args.callback();
			}
		};
	});
}

jQuery.fn.getBgFrom = function(el) {
    return this.each(function() {
        var jthis = jQuery(this);
        var bgString = el.css("background-color") + " " + 
                       el.css("background-image") + " " +
                       el.css("background-repeat") + " " +
                       el.css("background-attachment") + " " +
                       el.css("background-position");
        jthis.css("background", bgString);
    });
}
