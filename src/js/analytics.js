// Google Analytics code. It tracks the page asynchronously. The reason why you would put this in <head> is that it otherwise can't see partial pageloads. ga.js still loads async, but now we create an array of tracking events for the ga.js script to consume once it has finished downloading.
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-XXXXX-X']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();
