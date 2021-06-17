
let gulp = require("gulp");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");

var css = {
  src: '_assets/**/*.scss',
  dest: './docs/css/',
  filename: 'site.scss'
};

var js = {
  src: '_assets/**/*.js',
  dest: './docs/',
  filename: '*.js'
};

function style() {
  return (
    gulp
      .src(css.src)
      
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(autoprefixer())
      .pipe(gulp.dest('./docs/css/'))
      
      
  );
}

function script() {
  return (
    gulp
      
      .pipe(gulp.dest('./docs/'))
      
      
  );
}

// Jekyll
function jekyll() {
    return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
}



function watch(){
  gulp.watch(css.src, style);
  gulp.watch(js.src, script);
}

exports.css = style;
exports.js = script;
exports.default = watch;


