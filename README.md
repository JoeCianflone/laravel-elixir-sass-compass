laravel-elixir-sass-compass
======================

## Usage
This is a simple compass wrapper for Laravel Elixir that was ported from: [laravel-elixir-stylus](https://github.com/JeffreyWay/laravel-elixir-stylus)
Add it to your Elixir-enhanced Gulpfile, like so:

```
var elixir = require('laravel-elixir');

require('laravel-elixir-compass');

elixir(function(mix) {
   mix.compass();
});
```

This will scan your `resources/assets/scss` directory for all files. Instead, if you only want to compile a single file, you may do:

```
mix.compass("bootstrap.scss");
```

Finally, if you'd like to output to a different directory than the default `public/css`, then you may override this as well.

```
mix.compass("bootstrap.scss", "foo/bar/baz");
```

##Options

Compass has a lot of different options and ways you can tweak your output:

```
mix.compass("bootstrap.scss", "foo/bar/baz", {
    modules: ['susy'],
    config_file: "path/to/config.rb",
    style: "nested"
    sass: "resources/assets/sass",
    font: "public/fonts",
    image: "public/images",
    javascript: "public/js",
    sourcemap: true
});
```

* ```modules``` - if you have any modules you'd like to include, like Susy or whatever, you can add them here.
* ```config_file``` - if you like to keep your compass configurations out of gulp, you can set the path to the config file and you can use that.  *Important note: if you change the Sass and CSS directories in your config.rb file you need to update them in here too*
* ```style``` - 3 options here: "nested", "compressed" and "expanded".  By default in production you css will be compressed and locally it will be expanded.
* ```sass``` - path to Sass files
* ```font``` - path to fonts directory
* ```image``` - path to image directory
* ```javascript``` - path to your JavaScript
* ```sourcemap``` - *requires sass 3.3.0+* if true will generate a source map 
