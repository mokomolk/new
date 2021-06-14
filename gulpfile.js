"use strict";

let gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer"),
  exec = require("gulp-exec"),
  browserSync = require("browser-sync").create(),
  cp = require("child_process");



gulp.task("css", function () {
  return gulp
    .src("_assets/css/**/*.css")
    .pipe(autoprefixer())
    .pipe(gulp.dest("./docs/css/"))
    .pipe(browserSync.stream({ match: "**/*.css" }));
});


// Jekyll
function jekyll() {
	return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
  };



gulp.task("jekyll", function () {

   return gulp
    .src(["./*.html", "./layout/**/*.html", "./_posts/**/*.markdown"])
    .pipe(exec("jekyll build"))
    .pipe(exec.reporter());
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./docs/",
    },
  });

  gulp.watch("_assets/css/**/*.css", gulp.series("css"));

  gulp.watch("docs/**/*.html").on("change", browserSync.reload);
  gulp.watch("docs/**/*.js").on("change", browserSync.reload);

  gulp.watch(
	[
	  "./*.html",
	  "./_includes/*.html",
	  "./_layouts/*.html",
	  "./_posts/**/*"
	]
  ).on('change', gulp.series('jekyll', "css") 
  );
});

gulp.task("default", gulp.series("css", "watch"));
