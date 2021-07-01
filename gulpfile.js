//const watchify = require("wathcify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const { src, dest } = require("gulp");
const { series } = require("gulp");
const babel = require("gulp-babel");
const { watch } = require("gulp");

function transpile() {
  return src("src/index.js").pipe(babel()).pipe(dest("dist/"));
}

function brsfi() {
  return browserify("./dist/index.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(dest("./dist/"));
}

// enable this if you want to watch changes

/* exports.default = function() {
  watch('src/index.js', series(transpile, brsfi));
} */

// enable this if you want manualy run you build
exports.default = function () {
  watch("src/*.js", series(transpile, brsfi));
};
