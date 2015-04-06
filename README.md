### PSI analysis 3/26/15 17:29
Mobile 70/100
Desktop 83/100
#### Changes made:
1. Google analytics made "async"
2. print.css media query added: media= "print"

### PSI analysis 3/26/15 17:50
Mobile 73/100
Desktop 86/100
####Changes made:
1. style.css code moved inline, within style tags within index.html
	Reference: https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery#CSSattributes

### PSI analysis 3/26/15 18:07
Mobile 70/100
Desktop 86/100
#### Changes made:
1. Commented out web fonts link

### PSI analysis 3/26/15 18:11
Mobile 82/100
Desktop 87/100
#### Changes made:
1. Resized views/images/pizzeria.jpg to a 100x75 jpg located at /img/pizzeria-sm.jpg

### PSI analysis 3/26/15 18:30
Mobile 92/100
Desktop 95/100
#### Changes made:
1. Compressed pizzeria-sm.jpg and profilepic.jpg

### PSI analysis 3/26/15 18:34
Mobile 94/100
Desktop 95/100
#### Changes made:
1. Took Google PSI up on its offer to optimize my files.
They returned a zip, describing the following in the MANIFEST document.

 This zip file contains optimized resources for http://181b88c7.ngrok.com/. The optimized resources are listed below in the format of: filename: url
 * Note: We only include up to 10 MB of optimized contents. If the optimized contents of your page are larger than 10 MB, we list them in this file too, with 'NOT INCLUDED' to indicate those URLs require further optimization.
 * css/print.css: http://181b88c7.ngrok.com/css/print.css
 * js/perfmatters.js: http://181b88c7.ngrok.com/js/perfmatters.js
 * image/profilepic.jpg: http://181b88c7.ngrok.com/img/profilepic.jpg
 * image/pizzeria-sm.jpg: http://181b88c7.ngrok.com/img/pizzeria-sm.jpg



## FPS Exercise - Resources & Reflections
#### 1: I considered using jQuery to speed things up, until I read how it tends to do quite the contrary:
http://stackoverflow.com/questions/11503534/jquery-vs-document-queryselectorall

#### 2: I referenced S/O to cope with window resizing.
http://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window



## Last task for myself:
### Analyze Main.js for adherance to style guidelines
```
// semicolon following variable declaration, without whitespace
var pizzaIngredients = {};

// No semicolon following function declaration
function randomName() {
  var randomNumberAdj = parseInt(Math.random() * adjectives.length);
  var randomNumberNoun = parseInt(Math.random() * nouns.length);
  return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// semicolon following function expressionvar selectRandomMeat = function() {
  var randomMeat = pizzaIngredients.meats[Math.floor((Math.random() * pizzaIngredients.meats.length))];
  return randomMeat;
};

// No semicolon following curly braces closing control statements
for (var i = 0; i < numberOfMeats; i++) {
  pizza = pizza + ingredientItemizer(selectRandomMeat());
 }
```


## Website Performance Optimization portfolio project

Your challenge, if you wish to accept it (and we sure hope you will), is to optimize this online portfolio for speed! In particular, optimize the critical rendering path and make this page render as quickly as possible by applying the techniques you've picked up in the [Critical Rendering Path course](https://www.udacity.com/course/ud884).

To get started, check out the repository, inspect the code,

### Getting started

####Part 1: Optimize PageSpeed Insights score for index.html

Some useful tips to help you get started:

1. Check out the repository
1. To inspect the site on your phone, you can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! Optional: [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

Profile, optimize, measure... and then lather, rinse, and repeat. Good luck!

####Part 2: Optimize Frames per Second in pizza.html

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js. 

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
