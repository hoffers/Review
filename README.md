## Website Performance Optimization portfolio project

####Part 1: Optimize PageSpeed Insights score for index.html

PageSpeed Insights score optimized to 95 for both mobile and desktop:
1. Launch [http://rajnesh.github.io/webop/](http://rajnesh.github.io/webop/) to checkout the optimized page
2. Click [here](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Frajnesh.github.io%2Fwebop%2F&tab=mobile) to analyze it in PageSpeed Insights


####Part 2: Optimize Frames per Second in pizza.html

Optimized main.js. Launch [http://rajnesh.github.io/webop/views/pizza.html/](http://rajnesh.github.io/webop/views/pizza.html) to view page

Several changes were made to main.js. The most influential were:

1. function changePizzaSizes: changes were made so that the new size (from slider) was claculated just once (before the for loop instead of inside the for loop)
2. function updatePositions: changes were made to this function so that scrolling only moves those pizza images that are visible in the viewport. A new function (isElementInViewport) was added to calcuate that.