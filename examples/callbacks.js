function readFile(callback) {
  let file;
  /// use fileReader API to
  /// read the file
  callback(file);
} 

readFile('myfile.txt', file => {
  console.log(file.contents);
});

// example of async code problems
function getUserName() {
  let userName;
  // async call
  $.get('/users/123', user => {
    userName = user.name;
  });
  return userName; 
}

console.log('Username: ' + getUserName()); // Username: undefined

// complexity
function getTotalFileSize(file1, file2, file3, callback) {
  let total = 0;
  readFile(file1, (error, info) => {
    total += info.size;
    readFile(file2, (error, info) => {
      total += info.size;
      readFile(file3, (error, info) => {
        total += info.size;
        callback();
      });      
    });    
  });
}

function getTotalFileSize2(file1, file2, file3, callback) {
  let numFinished = 0;
  let total = 0;
  [file1, file2, file3].forEach(file => {
    readFile(file, (error, info) => {
      total += info.size;
      numFinished += 1;
      if (numFinished === 3) {
        callback();
      }
    });
  });
}

function getTotalFileSizeWithErrorHandling(file1, file2, file3, callback) {
  let total = 0;
  readFile(file1, (error, info) => {
    if(error) {
      console.log('error happened');
      return;
    }
    total += info.size;
    readFile(file2, (error, info) => {
      if(error) {
        console.log('error happened');
        return;
      }      
      total += info.size;
      readFile(file3, (error, info) => {
        if(error) {
          console.log('error happened');
          return;
        }        
        total += info.size;
        callback();
      });      
    });    
  });
}

// Callback Hell!
fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
