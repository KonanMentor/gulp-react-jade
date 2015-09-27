import through from 'through2'
import jade from 'react-jade'
import browserify from 'react-jade/lib/browserify'
import {Readable} from 'stream'

function getReadableFromString (str) {
  const stream = new Readable()
  stream._read = () => {}
  stream.push(str)
  stream.push(null)
  return stream
}

export default (options) => {
  return through.obj(function (file, enc, callback) {
    if (file.isNull()) {
      this.push(file)
      callback()
    } else if (file.isBuffer()) {
      const stream = browserify(file.path)
      let res = ''
      stream
        .on('data', data => res += data)
        .on('end', () => {
          file.contents = new Buffer(res)
          this.push(file)
          callback()
        })
      
      getReadableFromString(file.contents.toString())
        .pipe(stream)
    } else if (file.isStream()) {
      throw new Error('Streams are not supported')
      callback()
    } else {
      callback()
    }
  })
}
