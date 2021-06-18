
let gulp = require("gulp");
let sass = require("gulp-sass");
let autoprefixer = require("gulp-autoprefixer");
let cp = require("child_process");
const { series } = require("gulp");
let browserSync = require('browser-sync').create();

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

//browsersynce function


function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function browserSyncServe(done) {
  browserSync.init({
      server: {
          baseDir: "./docs/"
      }
  });
  gulp.watch([css.src, , js.src], series(jekyll, browserSyncReload));
  gulp.watch(style);
}



exports.css = (css.src, style)
exports.default = browserSyncServe;



