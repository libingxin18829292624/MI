var gulp = require("gulp");
var sass = require("gulp-sass");
var minifyCss = require("gulp-minify-css");
var uglify = require("gulp-uglify");

gulp.task("copy-index",function(){
	gulp.src("*.html")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI"));
});

gulp.task("copy-img",function(){
	gulp.src("img/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\img"));
});

gulp.task("copy-js",function(){
	gulp.src("js/**/*.js")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\js"));
});

gulp.task("copy-font",function(){
	gulp.src("font/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\font"));
});

gulp.task("sass",function(){
	gulp.src("css/**/*.scss")
	.pipe(sass())
	.pipe(minifyCss())
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\css"));
});

gulp.task("copy-src_css",function(){
	gulp.src("src_css/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\src_css"));
});

gulp.task("copy-src_js",function(){
	gulp.src("src_js/**/*")
	.pipe(gulp.dest("D:\\phpStudy\\WWW\\MI\\src_js"));
});

gulp.task("watch",function(){
	gulp.watch("*.html",["copy-index"]);
	gulp.watch("img/**/*",["copy-img"]);
	gulp.watch("js/**/*.js",["copy-js"]);
	gulp.watch("font/**/*",["copy-font"]);
	gulp.watch("src_js/**/*",["copy-src_js"]);
	gulp.watch("src_css/**/*",["copy-src_css"]);
	gulp.watch("css/**/*.scss",["sass"]);
});