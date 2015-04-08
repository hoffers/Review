## Website Performance Optimization portfolio project

index.html - 95/100
project-2048.html - 93/100
project-mobile.html - 97/100
project-webperf.html - 97/100

All external css and javascript files were minified and added to the actual html files.
I used the Javascript code from Google fonts to import Open Sans font file.

To optimmize pizza.html, all css files were minified and were placed under the head tag. The pizzeria.jpg was resized to 360px by 270px, reducing the file size from 2.4MB to 18KB (yay!)
main.js was also minified and the script was inserted in the body of pizza.html.

The following are the changes I made to main.js.
1. Under changePizzaSizes, I moved determineDx out of the for loop because the calculation does not have to happen per iteration since all pizzas are the same size.
2. Under updatePositions function, I moved document.body.scrollTop / 1250 calculation out of the for loop. Calculation canonly accur once then stored in a variable. Calculating it everytime reduces performance speed.
3. I updated variable to 60. That's about how many pizzas display on the screen at one time. 200 pizzas is way too many!

To launch the project, open index.html using your favorite browser.

Resources:
Determine Page Speed: https://developers.google.com/speed/pagespeed/insights/
CSS Minifier: http://cssminifier.com/
Javascript Minifier: http://javascript-minifier.com/

