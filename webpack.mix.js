const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.styles([
	'node_modules/semantic-ui-css/semantic.min.css',
	'node_modules/semantic-ui-css/components/icon.min.css'
], 'public/css/app.css');

mix.scripts([
	'node_modules/jquery/dist/jquery.min.js',
	'node_modules/semantic-ui-css/semantic.min.js',
], 'public/js/app.js');

mix.copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.ttf', 'public/css/themes/default/assets/fonts/icons.ttf');
mix.copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.woff2', 'public/css/themes/default/assets/fonts/icons.woff2');
mix.copy('node_modules/semantic-ui-css/themes/default/assets/fonts/icons.woff', 'public/css/themes/default/assets/fonts/icons.woff');

mix.js('resources/js/index.js', 'public/js/client.js');