const fs = require('fs');
const path = require('path');

// Set the source and destination directories
const sourceDir = 'C:/Users/Ivan/Desktop/praksa node js/praksa';
const destDir = 'C:/Users/Ivan/Desktop/praksa node js/new_destination';

// Get the list of directories in the source directory
const dirs = fs.readdirSync(sourceDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Loop through each directory in the source directory
dirs.forEach((dir) => {
  const dirPath = path.join(sourceDir, dir);

  // Get the list of files in the directory
  const files = fs.readdirSync(dirPath);

  // Find the newest file in the directory
  const newestFile = files.reduce((newest, file) => {
    const stats = fs.statSync(path.join(dirPath, file));
    if (stats.mtime > newest.mtime) {
      return { name: file, mtime: stats.mtime };
    }
    return newest;
  }, { name: null, mtime: new Date(0) });

  if (!newestFile.name) {
    console.log(`No files found in directory ${dirPath}`);
    return;
  }

  // Rename the newest file with the directory name
  const newFileName = `${dir}.txt`;
  fs.renameSync(path.join(dirPath, newestFile.name), path.join(dirPath, newFileName));

  // Copy the renamed file to the destination directory
  fs.copyFileSync(path.join(dirPath, newFileName), path.join(destDir, newFileName));

  console.log(`File ${newFileName} copied from directory ${dirPath}`);
});

console.log('Copying done!');