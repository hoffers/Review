####Part 2: Optimize Frames per Second in pizza.html

Optimized main.js. Launch [http://rajnesh.github.io/webop/views/pizza.html/](http://rajnesh.github.io/webop/views/pizza.html) to view page

Several changes were made to main.js. The most influential were:

1. function changePizzaSizes: changes were made so that the new size (from slider) was claculated just once (before the for loop instead of inside the for loop)
2. function updatePositions: changes were made to this function so that scrolling only moves those pizza images that are visible in the viewport. A new function (isElementInViewport) was added to calcuate that.