# gulp-react-jade

For [jadejs/react-jade](https://github.com/jadejs/react-jade "jadejs/react-jade")

## Installation

```
npm i konanmentor/gulp-react-jade --save-dev
```

## Example

```js
import jade from 'gulp-react-jade'

gulp.task('react-jade', () => {
  return gulp.src('test.js')
    .pipe(jade())
    .pipe(gulp.dest('lib'))
})
```
