## Website Performance Optimization portfolio project

FILE STRUCTURE
	/css
	/js
	/img
	/z_development
		/css
		/img
		/js

STEPS USED TO OPTIMIZE

PIZZA PAGE:
	1) Modified updatePositions() by takeing scrolltop outside the for loop.
	2) Applied css traslateX() and translateZ(0) to .mover
	3) Used getElementsByClassName instead of querySelectorALl because it's costly
	4) Changed from 200 pizzas to 30 pizzas.
	5) Removed the width and height, this is costly for the browser to render. Sized them to exactly 100 width and height.
	6) Modified ChangePizaSizes(Size) brought determineDX outside the for loop. 

INDEX.HTML
	1) Inlined all css. Used media="print" for print style sheets
	2) Added Async attribue to all script tags. Minifed js file and concatenate them. 
	3) Resized all images with Compressor.io - Resized in photoshop ones need to resize to specific size. 
 

