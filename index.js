var elixir = require('laravel-elixir'),
    gulp = require("gulp"),
    compass = require('gulp-compass'),
    Utilities = require('laravel-elixir/ingredients/commands/Utilities'),
    Notification = require('laravel-elixir/ingredients/commands/Notification'),
    _ = require('underscore');

elixir.extend("compass", function(src, outputDir, options) {

    var config = this,
        publicDir = './public/',
        defaultOptions = {
            generated_images_path: false,
            config_file: false,
            javascript:  config.jsOutput,
            sourcemap:   false,
            http_path:   false,
            relative:    true,
            comments:    true,
            require:     false,
            style:       config.production ? "compressed" : "nested",
            image:       publicDir + 'images',
            font:        publicDir + 'fonts',
            sass:        config.assetsDir + 'scss',
            css:         outputDir || config.cssOutput
        };
    options = _.extend(defaultOptions, options);

    if (_.has(options, 'js')) {
        options.javascript = options.js;
        options = _.omit(options, 'js');
    }
    if (_.has(options, 'modules')) {
        options.require = options.modules;
        options = _.omit(options, 'modules');
    }

    src = Utilities.buildGulpSrc(src, options.sass, '**/*.scss');

    var onError = function(e) {
        new Notification().error(e, 'Compass Compilation Failed!');
        this.emit('end');
    };

    gulp.task('compass', function() {
        return gulp.src(src)
            .pipe(compass(options)).on('error', onError);
    });

    this.registerWatcher('compass', options.sass + '/**/*.scss');
    return this.queueTask("compass");
});
