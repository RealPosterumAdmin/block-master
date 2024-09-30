const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const path = require('path');

// Papka nomini qabul qilish
const folderName = process.argv.includes('--folderName') ? process.argv[process.argv.indexOf('--folderName') + 1] : null;

if (!folderName) {
    console.error('Papka nomi berilmagan!');
    process.exit(1);
}

gulp.task('build-js', () => {
    const inputFile = path.join(folderName, 'gutenberg.js');
    const outputDir = folderName;

    return gulp.src(inputFile)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env', '@babel/preset-react']
        }))
        .pipe(uglify())
        .pipe(rename('bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputDir));
});

gulp.task('default', gulp.series('build-js'));
