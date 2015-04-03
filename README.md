Udacity - Project 4 - Optimizing website performance
### Getting started

Setting up the workspace on local:

1. Check out the repository
1. You can run a local server

  ```bash
  $> cd /path/to/your-project-folder
  $> python -m SimpleHTTPServer 8080
  ```

1. Open a browser and visit localhost:8080
1. To allow the localhost to be available over public web
1. Download and install [ngrok](https://ngrok.com/) to make your local server accessible remotely.

  ``` bash
  $> cd /path/to/your-project-folder
  $> ngrok 8080
  ```

1. Copy the public URL ngrok gives you and try running it through PageSpeed Insights! [More on integrating ngrok, Grunt and PageSpeed.](http://www.jamescryer.com/2014/06/12/grunt-pagespeed-and-ngrok-locally-testing/)

### Optimizations performed

01. Improved loops by caching variables
02. Simplified loop by taking variable out of it
	    var pizzasDiv = document.getElementById("randomPizzas");
            for (var i = 2; i < 100; i++) {
              // var pizzasDiv = document.getElementById("randomPizzas");
              pizzasDiv.appendChild(pizzaElementGenerator(i));
            }
05. caching document.body.scrollTop: 
06. Using inline CSS to improve rendering of page.
07. Limited updatePositions loop to the "visible" pizzas, that is to say the pizzas which are within the visible window in the 
    browser. Inside the loop only change pizzas where the top is less than or equal to the window height
08. PageSpeed Insights recommended adding image size to the background pizza image
09. implementing the use of requestAnimationFrame as indicated by various sources, and in particular:
    http://www.html5rocks.com/en/tutorials/speed/animations/
    The change consists in not calling directly updatePositions to update the background sliding pizza, but to 
    let the browser do that in its own time using the requestAnimationFrame.
10. added async for google analytics script and for perfmatter
11. Used optimized images by compressing and resizing them through a image manipulation tool.
12. Removed 2 tags from the style.css because they were not used (b and ol)

### Tools, links, posts, readings and more

http://www.html5rocks.com/en/tutorials/speed/animations/
On the theme of using requestAnimationFrame instead of calling updatePositions directly
in order to be in sync with the refresh cycle of the browser and avoid causing reflowing and repainting

https://www.igvita.com/2014/05/20/script-injected-async-scripts-considered-harmful/
On the theme of how to avoid creating blockages of the CRP when using JavaScript resources.
How the approach has changed with the introduction of "async" but also on the risks and limitations
of using it.

https://blogs.oracle.com/greimer/entry/best_way_to_code_a
Learning that something that I have always done instictively in my scripts in Perl or Python, has a technical name: "caching". 


### Other resources used 

https://developer.chrome.com/devtools/docs/timeline
http://www.webpagetest.org
http://googlewebfonts.blogspot.co.uk/2010/09/optimizing-use-of-google-font-api.html
https://developers.google.com/fonts/docs/webfont_loader
https://github.com/typekit/webfontloader 
https://www.youtube.com/watch?v=vBHt61yDO9U 
http://gtmetrix.com/ 
http://stackoverflow.com/questions/12316501/including-google-web-fonts-link-or-import/12380004#12380004 
https://www.youtube.com/watch?v=sqesm0euf9M (webfonts with Ilya Gregorik)
https://www.youtube.com/watch?v=YV1nKLWoARQ (Ilya Gregorik)
https://tinypng.com (image optimization)
http://www.picresize.com/results
http://www.w3schools.com/jsref/prop_win_innerheight.asp (about window size)



