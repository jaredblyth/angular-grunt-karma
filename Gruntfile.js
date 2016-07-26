module.exports = function(grunt) {
    
    
    // GRUNT INIT
    grunt.config.init({
        
        
        // SOURCE & DIST FOLDER LOCATIONS SET IN THE NPM package.json
        pkg: grunt.file.readJSON('package.json'),
        
        
        // NOW THE CONFIG FOR EACH MODULE
		useminPrepare: {
            html: ['<%= pkg.destDir %>{,*/}*.html'], 
            options: {
                dest: '<%= pkg.destDir %>'
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
						cwd: '<%= pkg.srcDir %>',
                        dest: '<%= pkg.destDir %>',
                        src: [
                            //'**' // Copies all files & folders, otherwise use below to copy specific files only
                            // Note that images, js, css files are copied as part of other grunt tasks below
							'*.html',
                            'views/**',
                            'fonts/**'
                        ]
                    }
				]
            }
        },
        imagemin: {
            dynamic: { 
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '<%= pkg.srcDir %>',
                    src: ['images/{,*/}*.{png,jpg,gif}','favicon.ico'],
                    dest: '<%= pkg.destDir %>'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.srcDir %>',
                    src: 'images/{,*/}*.svg',
                    dest: '<%= pkg.destDir %>'
                }]
            }
        },
		uglify: {
            options: {
                banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            js: {
                files : {

                    '<%= pkg.destDir %>scripts/scripts.js' : 
                        [
                            '<%= pkg.srcDir %>components/jquery/jquery.min.js',
                            '<%= pkg.srcDir %>components/angular/angular.min.js',
                            '<%= pkg.srcDir %>components/json3/lib/json3.min.js',
                            '<%= pkg.srcDir %>components/bootstrap/dist/js/bootstrap.min.js',
                            '<%= pkg.srcDir %>components/angular-resource/angular-resource.min.js',
                            '<%= pkg.srcDir %>components/angular-cookies/angular-cookies.min.js',
                            '<%= pkg.srcDir %>components/angular-sanitize/angular-sanitize.min.js',
                            '<%= pkg.srcDir %>components/angular-animate/angular-animate.min.js',
                            '<%= pkg.srcDir %>components/angular-touch/angular-touch.min.js',
                            '<%= pkg.srcDir %>components/angular-route/angular-route.min.js',
                            '<%= pkg.srcDir %>components/lodash/dist/lodash.min.js',
                            '<%= pkg.srcDir %>components/angular-google-maps/dist/angular-google-maps.min.js',
                            '<%= pkg.srcDir %>scripts/{,*/}*.js'
                        ]

                }
            }
        },
        cssmin: {
            options: {
                banner: '/*! CSS Build - <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            css: {
                files : {

                    '<%= pkg.destDir %>styles/main.css' : 
                        [
                            '<%= pkg.srcDir %>components/bootstrap/dist/css/bootstrap.css',
                            '<%= pkg.srcDir %>styles/{,*/}*.css'
                        ]

                }
            }
        },
		usemin: {
            html: ['<%= pkg.destDir %>{,*/}*.html'],
            css: ['<%= pkg.destDir %>styles/{,*/}*.css'],
            options: {
                dirs: ['<%= pkg.destDir %>']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeComments: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= pkg.destDir %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= pkg.destDir %>'
                }]
            }
        },
		clean: {
            server: ['.tmp']
        },

        
        // Grunt Karma Test Settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }

    });
    
    
    // NOW LOAD THE REQUIRED GRUNT MODULES
    grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-svgmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');
    
 
    // GRUNT BUILD
    grunt.registerTask('build', [
		'useminPrepare',
		'copy',
        'imagemin',
        'svgmin',
		'uglify',
		'cssmin',
		'usemin',
        'htmlmin',
		'clean'
	]);
    
    
    // GRUNT TEST
    grunt.registerTask('test', [
        'clean:server',
        'karma'
    ]);
	
    
    // GRUNT
    // Default 'grunt' command that runss both build &  test
	grunt.registerTask('default', ['build','test']);
    
}