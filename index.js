#!/usr/local/bin/node

var path = require('path');
var chokidar = require('chokidar');
var fs = require('fs');
var cloudinary = require('cloudinary')
var log = console.log.bind(console);
require('shelljs/global');
var syncDirPath = path.resolve(__dirname, '..','..','..','Desktop/up2cloudinary');

if (!fs.existsSync(syncDirPath)){
    fs.mkdirSync(syncDirPath);
}

exec('defaults write com.apple.screencapture location' + syncDirPath)
exec('killall SystemUIServer')

var configDic = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cloudinary.conf'),'utf8'))

if (configDic) {
    cloudinary.config(configDic);
}else {
    console.warn("you must make a file names 'cloudinary.conf'");
}

function performUploadByFilePath(filePath){
    log(`File ${filePath} has been added`);

    // File uploader
    cloudinary.uploader.upload(filePath,function(err,image){
      console.log("** File Upload");
      if (err){ console.warn(err);}
      fs.unlinkSync(filePath);
    });

}

// One-liner for current directory, ignores .dotfiles
chokidar.watch( syncDirPath, {ignored: /[\/\\]\./}).on('add', path => {
    performUploadByFilePath(path);
});







