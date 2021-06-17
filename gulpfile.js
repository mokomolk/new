const { src, dest, watch, series, parallel } = require('gulp');




const sass = require('gulp-sass');

const autoprefixer = require('autoprefixer');



const cp = require("child_process");

const browserSync = require('browser-sync').create();

// File paths

const files = {
    scssPath: '_assets/**/*.scss',
    cssPath: "./docs/css/",
    jsPath: 'assets/js/main.js',
   
}


// Sass task: compiles the style.scss file into style.css
function scssTask(){
    return src(files.scssPath)
        
        .pipe(sass().on('error', sass.logError))
        
       
        .pipe(dest("./docs/css/")) // put final CSS in dist folder
        .pipe(browserSync.reload({stream:true}))
}





// Jekyll
function jekyll() {
    return cp.spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit", shell: true });
}


// Watch task: watch SCSS and JS files for changes
// If any change, run scss and js tasks simultaneously
function watchTask(){

    watch([files.scssPath], parallel(scssTask, browserSyncReload));
    
    watch(['_includes/**', '_layouts/**/*', 'pages/**'], series(jekyll, browserSyncReload));
   

}

//browsersynce function
function browserSyncServe(done) {
    browserSync.init({
        server: {
            baseDir: "./docs/"
        }
    });
    done();
}

function browserSyncReload(done) {
    browserSync.reload();
    done();
}

// exports.build = build;
// exports.default = series(clean, build);

exports.default = series(
    parallel(jekyll, scssTask),
    browserSyncServe,
    watchTask
);

// exports.default = series(parallel(scssTask, jsTask, browserSyncServe), watchTask);


