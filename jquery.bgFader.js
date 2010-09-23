/*
 * jQuery bgFader plugin v0.1.0, 2010-09-23
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
		type : 'out',  //out (in and cross coming soon)
		duration : 300, //accepts jQuery defined strings (eg slow, fast) or ms
		fadeTo : '0', //0 <-> 1
		newBg : '', //coming soon  (new aruments for CSS 'background:' short hand declaration)
		easing : 'linear' //linear or swing (unless you have the jQuery easing plugin installed)
	}
	args = jQuery.extend({}, defs, userargs);
	return this.each(function () {
		var obj = jQuery(this),
			z = obj.css("z-index"),
			holder = $('<div></div>').css("position", "relative"),
			underlay = $("<div></div>");
		obj.wrap(holder);
		if(z == "auto") { z = 0; }
		underlay.css({
			"z-index" : z - 1,
			"position" : "absolute",
			"top" : 0,
			"left" : 0,
			"width" : obj.css("width"),
			"height" : obj.css("height"),
			"background-image" : obj.css("background-image"),
			"background-repeat" : obj.css("background-repeat"),
			"background-position" : obj.css("background-position")
		}).insertBefore(obj);
		obj.css("background", "none");
		underlay.animate({
			'opacity' : args.fadeTo
		}, args.duration, args.easing, cleanup)
		
		function cleanup() {
			var holder = obj.parent();
			underlay.remove();
			obj.insertBefore(holder);
			holder.remove();
		};
	});
}
