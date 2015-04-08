'use strict';

var ngrok = require('ngrok');

module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);
	var port = grunt.option('portNumber') || 8080;
	var base = grunt.option('dirName') || '.';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				globals: {
					eqeqeq: true,
					forin: true,
					curly: true,
					latedef: true,
					undef: true,
					unused: true,
					devel: true,
					jQuery: true,
					browser: true
				}
			},
			files: ['js/**/*.js', 'views/**/*.js']
		},
		'string-replace': {
			general: {
				files: [{
					expand: true,
					src: ['evaluate/**/*.html'],
					dest: './'
				}],
				options: {
					replacements: [{
						pattern: /\.(css|html|js)/ig,
						replacement: function(p1) {
							return '.min' + p1;
						}
					}]
				}
			},
			ganalytics: {
				files: [{
					expand: true,
					src: ['evaluate/**/*.html'],
					dest: './'
				}],
				options: {
					replacements: [{
						pattern: /(analytics\.min\.js)/ig,
						replacement: function() {
							return 'analytics.js';
						}
					}]
				}
			}
		},
		dom_munger: {
			html: {
				options: {
					callback: function($, file) {
						var $pizzeriaImg = $("img").last();
						if ($pizzeriaImg.attr("src") === "views/images/pizzeria.jpg") {
							$pizzeriaImg.attr("src", "img/pizzeria.jpg");
						}
					}
				},
				src: './index.html',
				dest:	'./index.html'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> by <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			js: {
				files: [{
					expand: true,
					src: ['js/**/*.js', 'views/**/*.js'],
					dest: './evaluate',
					ext: '.min.js'
				}]
			}
		},
		htmlmin: {
			html: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
					removeEmptyAttributes: true,
					removeScriptTypeAttributes: true,
					removeStyleLinkTypeAttributes: true,
					removeOptionalTags: true,
					minifyJS: true,
					minifyCSS: true
				},
				files: [{
					expand: true,
					src: ['*.html', 'views/**/*.html'],
					dest: './evaluate/',
					ext: '.min.html'
				}]
			}
		},
		cssmin: {
			css: {
				files: [{
					expand: true,
					src: ['css/*.css', 'views/**/*.css'],
					dest: './evaluate',
					ext: '.min.css'
				}]
			}
		},
		responsive_images: {
			options: {
				engine: "im",
				quality: 60,
				rename: false
			},
			profile: {
				options: {
					sizes: [{width: 100}]
				},
				files: {
					'./evaluate/img/pizzeria.jpg': 'views/images/pizzeria.jpg'
				}
			},
			pizza: {
				options: {
					sizes: [{width: 360}],
				},
				files: {
					'./evaluate/views/images/pizzeria.jpg': 'views/images/pizzeria.jpg'
				}
			}
		},
		imagemin: {
			resized: {
				options: {
					progressive: true,
				},
				files: [{
					expand: true,
					src: ['evaluate/**/*.jpg'],
					dest: './',
				}]
			},
			notResized: {
				options: {
					optimizationLevel: 7,
					progressive: true
				},
				files: [{
					expand: true,
					src: ['views/**/*.png', 'img/*.{jpg,png}'],
					dest: 'evaluate/'
				}]
			}
		},
		copy: {
			fonts: {
				expand: true,
				cwd: 'fonts/',
				src: ['**'],
				dest: 'evaluate/fonts/',
				flatten: true
			},
			html: {
				files: [
					{expand: true, src: '*.html', dest: 'evaluate/', flatten: true},
					{expand: true, src: 'views/*.html', dest: 'evaluate/views/', flatten: true}
				]
			},
			js: {
				files: [
					{expand: true, src: 'js/*.js', dest: 'evaluate/js/', flatten: true},
					{expand: true, src: 'views/**/*.js', dest: 'evaluate/'}
				]
			},
			css:{
				files: [
					{expand: true, src: 'css/*.css', dest: 'evaluate/css/', flatten: true},
					{expand: true, src: 'views/**/*.css', dest: 'evaluate/'}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: port,
					base: base
				}
			}
		},
		pagespeed: {
			options: {
				nokey: true,
				locale: "en_US",
				threshold: 70
			},
			desktop: {
				options: {
					strategy: "desktop"
				}
			},
			mobile: {
				options: {
					strategy: "mobile"
				}
			}
		}
	});

	grunt.registerTask('psi-ngrok', 'Run pagespeed with ngrok', function() {
		if (!grunt.option('dirName')) {
			var msg = "\nOption '--dirName' was not used:\n" +
				"Thus will run tests in the directory of Gruntfile.js.\n" +
				"To run on different folder - type:\n" +
				"grunt webspeed --dirName=<full\\path\\to\\folder\\" +
				"with\\index.html>\n" +
				"or use relative one to Gruntfil.js directory.\n";
			grunt.log.write(msg['yellow'].bold);
		}

		var done = this.async();

		ngrok.connect(port, function(err, url) {
			if (err !== null) {
				grunt.fail.fatal(err);
				return done();
			}
			grunt.config.set('pagespeed.options.url', url);
			grunt.task.run('pagespeed');
			done();
		});
	});

	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-responsive-images');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-dom-munger');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('webspeed', ['connect', 'psi-ngrok']);
	grunt.registerTask('default', ['jshint', 'dom_munger', 'uglify', 'htmlmin', 'cssmin',
		'responsive_images', 'imagemin', 'copy', 'string-replace']);
}