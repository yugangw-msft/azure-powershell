var path = require('path'),
    gulp = require('gulp'),
    debug = require('gulp-debug'),
    del = require('del'),
    shell = require('gulp-shell');

gulp.task('default', function () {
  // place code for your default task here
});

gulp.task('clean', function () {
  return del(['drop']);
});

var cluSrc = path.join(__dirname, 'src', 'CLU');
var localFeedPath = path.join(__dirname, 'tools', 'LocalFeed');
var feed = '-s https://api.nuget.org/v3/index.json -s ' + localFeedPath;

var dnxBuild = function () {
  return shell('dnu build', { cwd: '.\\src\\CLU\\Commands.ResourceManager.Cmdlets' });
}

gulp.task('build:restore', shell.task('dnu restore ' + feed, { cwd: cluSrc }));
gulp.task('build:clu', function () {
  var projects = gulp.src('src/CLU/**/project.json');
  return projects.pipe(dnxBuild())
});