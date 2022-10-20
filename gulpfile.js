const { src, dest, series, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const include = require("gulp-file-include");
const htmlmin = require("gulp-htmlmin");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const removeCssComments = require("gulp-remove-css-comments");

function html() {
  return src("src/**.html")
    .pipe(
      include({
        prefix: "@@",
      })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(gulp.dest("dist"));
}

function scss() {
  return src("src/styles/index.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
      })
    )
    .pipe(csso())
    .pipe(concat("index.css"))
    .pipe(removeCssComments())
    .pipe(dest("dist"));
}

const js = () => {
  return src("src/js/*").pipe(dest("dist/"));
};

function imgs() {
  return src("src/img/*").pipe(imagemin()).pipe(dest("dist/img"));
}

function serverFunc() {
  sync.init({
    server: "./dist",
  });

  watch("src/**.html", series(html, imgs)).on("change", sync.reload);
  watch("src/js/*", series(js)).on("change", sync.reload);
  watch("src/parts/**.html", series(html, imgs)).on("change", sync.reload);
  watch("src/styles/**.scss", series(scss)).on("change", sync.reload);
}

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.start = series(html, scss, imgs, serverFunc, js);
exports.build = series(html, scss, imgs, js);
