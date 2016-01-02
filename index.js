var Elixir = require('laravel-elixir'),
    gulp = require("gulp"),
    compass = require('gulp-compass'),
    _ = require('underscore'),
    Task = Elixir.Task,
    config = Elixir.config;


Elixir.extend("compass", function(src, output, options) {

    var defaultOptions = {
            generated_images_path: false,
            config_file: false,
            javascript:  config.js.outputFolder,
            sourcemap:   false,
            http_path:   false,
            relative:    true,
            comments:    true,
            require:     false,
            style:       config.css.sass.pluginOptions.outputStyle,
            image:       config.publicPath + '/images',
            font:        config.publicPath + '/fonts',
            sass:        config.assetsPath + '/' + config.css.sass.folder,
            css:         output || config.publicPath + '/' + config.css.outputFolder
        };

    options = _.extend(defaultOptions, options);

    new Task('compass', function() {

        var paths = prepGulpPaths(src, output);
        src = paths.src.path;

        return gulp.src(src).pipe(compass(options)).on('error', onError)
    })
        .watch(options.sass + '/**/*.+(sass|scss)');


    var onError = function(e) {
        return new Elixir.Notification()
            .error(e, 'Compass Compilation Failed!');
    };

    var prepGulpPaths = function(src, output) {
        return new Elixir.GulpPaths()
            .src(src, options.sass)
            .output(options.css, 'app.css');
    };
});
