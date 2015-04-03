module.exports = function(grunt) {

// TODO -
//      how to set up task target so that for "dev" no min.css files are generated into "prod"?
//      OPTIONS:
//          1. setup a watch task which will build min files first time but subsequently only changed files
//          2. run grunt only for production. Grunt file is only for production!
//

// 2 targets for tasks - development (dev) and production (prod)
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // automate tasks that run everytime a file is saved
        // Run from terminal using "grunt watch"...will then continue to run in background till terminal is killed
        // (unlike using "grunt" which must be typed in
        watch: {
            html: {
                files: ['index.html'],
                tasks: ['htmlhint']
            },

            scripts: {
                files: ['js/*.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        },

//        concat: {
            // 2. Configuration for concatinating files goes here.
//        }

        // Minify jscript file size
        uglify: {
            prod: {
                files: [{
                  expand: true,
                  cwd: 'src/js',
                  src: ['*.js', '!*.min.js'],
                  dest: 'dst/js',
                  ext: '.min.js'
                }]
            },
        },

        // Minify css files size
        cssmin: {
            prod: {
                files: [{
                  expand: true,
                  cwd: 'src/css',
                  src: ['*.css', '!*.min.css'],
                  dest: 'dst/css',
                  ext: '.min.css'
                }]
            },
        },


        // TODO - run lint on css and html files....jshint

        // html hint
        htmlhint: {
            build: {
                options: {
            //        'tag-pair': true,
                    'tagname-lowercase': true,
                    'attr-lowercase': true,
                    'attr-value-double-quotes': true,
                    'doctype-first': true,
                    'spec-char-escape': true,
                    'id-unique': true,
            //         'head-script-disabled': true,
            //         'style-disabled': true
                },
                src: ['index.html']
            }
        },


        // resize images to size presentable on web page
        responsive_images: {
            myTask: {
              options: {
                sizes: [{
//                  name: "min",
                  width: 310,
                  quality: 50
                }]
              },
              files: [{
                expand: true,
//                src: ['img/*.{jpg,gif,png}', '!img/*-min.{jpg,gif,png}', 'views/images/*.{jpg,gif,png}', '!views/images/*-min.{jpg,gif,png}']
                src: ['views/images/pizzeria.jpg']
              }]
            }
        },


        image: {
            dynamic: {
                options: {
                  pngquant: true,
                  optipng: true,
                  advpng: true,
                  zopflipng: true,
                  pngcrush: true,
                  pngout: true,
                  mozjpeg: true,
                  jpegRecompress: true,
                  jpegoptim: true,
                  gifsicle: true,
                  svgo: true
                },

                files: [{
                  expand: true,
//                  src: ['img/*-min.{jpg,gif,png}', 'views/images/*-min.{jpg,gif,png}']
                  src: ['views/images/pizzeria.jpg']
                }]
            }
        },

        //TODO - make dest files have .min.{} extension with .png, .jpg, or .gif appended
        // Compress image files
        // TODO - 0.8.1 is supposed to work w/o errors; b/c getting errors using latest version
        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    src: ['img/yo.jpg']
                }]
            }
        }


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
//    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-responsive-images');
grunt.loadNpmTasks('grunt-image');

// 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
  //  grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('default', ['responsive_images', 'image']);
    //grunt.registerTask('default', ['watch', 'sass', 'uglify', 'cssmin', 'htmlhint', 'imagemin']);


};