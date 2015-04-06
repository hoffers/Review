# P4: Website Performance Optimization

[Udacity Nanodegree](https://www.udacity.com/nanodegree), Front-End Developer

This project was developed as part of my Udacity Nanodegree in Front-End Development. It is based on the project files [here](https://github.com/udacity/frontend-nanodegree-mobile-portfolio).

## List of resources

Courses:

* [Udacity course: How to Use Git and GitHub](https://www.udacity.com/course/ud775-nd)
* [Udacity course: Web Performance Optimization](https://www.udacity.com/course/ud884-nd)
* [Pluralsight Course: Javascript Build Automation With Gulp.js](http://www.pluralsight.com/courses/javascript-build-automation-gulpjs)

Documentation:

* [gulp](https://github.com/gulpjs/gulp/tree/master/docs)
* Various documentation on gulp modules.
* [MDN](https://developer.mozilla.org/en-US/)

Q&A:

* [stackoverflow](http://stackoverflow.com)

Other:

* Parts of the [Google Web Starter Kit](https://github.com/google/web-starter-kit/releases/tag/v0.5.4) code.

## How to view the website

The simplest way to view the website is to navigate to the `./build/` folder and click on any page you want to open. The pages are neither gzipped nor cached as that is done by the server. If you wish to see the source, navigate to the `./src/` folder and open the corresponding file.

To use the supplied server and explore the build system, you will need to have node.js installed and run the following commands in the shell:

  ``` shell
  $ git clone https://github.com/trolster/P4-website-performance-optimization.git
  $ cd /path/to/project-folder
  $ npm install
  $ gulp serve --nosync
  ```
Then open http://localhost:8000 in your preferred browser.

## The build system

I decided to try out Gulp! For a guide on getting started with Gulp, you can read the [getting started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) documentation. For a good starting point with your `gulpfile.js`, refer to the `gulpfile.js` in the [Google Web Starter Kit](https://github.com/google/web-starter-kit/releases/tag/v0.5.4).

### Serving the content

The build system serves the content using the local express server at `./server/app.js`. The server is responsible for serving a favicon, and compressing and caching our responses.

An important note on compression: The local express server uses the compression module to compress local assets. If you run the server using `gulp serve`, browserSync will redirect you to http://localhost:3000 and inflate those assets. Therefore the Content-Encoding header is no longer set. In order to see compression working you must manually visit the page on http://localhost:8000.

### Gulp Tasks

You will find all the tasks in `gulpfile.js` in the projects root. You can run any task from the commandline like so:

  ``` shell
  $ cd /path/to/your-project-folder
  $ gulp <task> <othertask>
  ```
Or you can get an overview of which tasks are available to you by simply typing `gulp`.

## Files

### The JS

Both the Google Analytics script `ga.js` and `./src/js/perfmatters.js` now load asyncronously.

#### Changes in ./src/views/js/main.js:

* Changed the way the pizzas are generated on the page. The function `createMenu()` creates all elements outside the DOM and inserts them all at the same time, using `document.createDocumentFragment()`.
* The `changePizzaSizes()` function has been recast as `resizePizzas()` and includes a number of optimizations. When calling this function we remove `#randomPizzas` from the DOM, manipulate all of our menu items inside of it, and put it back in the DOM. This ensures that we only cause one reflow of the page. Also, rather than calculating a width, the element is given a `className` which defines the width.
* The `.mover` background images are created and updated somewhat differently. Rather than doing the heavy math in the loop, it has been moved outside. For instance, we use an array with the 5 phase values, so we only have 5 calls to `Math.sin()`. Then we use `translate3d` to update the positions on scroll and avoid repainting the entire screen on every update.

### Fonts

Both of the webfonts used are used on the front page and above the fold, so for the text to render they have to be downloaded.

From testing, the fastest loadtimes were found when I converted the fonts to base64 woff2 and inserted them directly as data-URI's in the CSS.

### The CSS

Most of the CSS is inlined in the HTML. This happens during the build process using the gulp-inline-source module.

### The HTML

There have been made only cosmetic changes to the HTML, including the inlining, minification and compression.

### The Images

Images have been resized where needed, and optimized using gulp-imagemin.

Enjoy!