bgFader
================
v0.1.0  
9/23/2010

About
-----
A jQuery plugin that allows a background to fade in or out independently of its content.

bgFader configuration (as well as defualts):
    $(myDiv).bgFader({
        'type' : 'out',  //in or out  (cross coming soon)
        'duration' : 300, //animation duraction - accepts jQuery defined strings (eg slow, fast) or ms
        'newBg' : '', //new aruments for CSS 'background:' short hand declaration
        'easing' : 'linear', //linear or swing (unless you have the jQuery easing plugin installed)
        'fadeTo' : '0', //Opacity level at end of animation
        'callback' : '' //Callback function when animation has completed
    });


For more visit the [project site](http://jdeerhake.com/bgFader.php).
