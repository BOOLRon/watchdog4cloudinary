#!/usr/local/bin/node

var notify = require('osx-notifier');
var ncp = require('copy-paste');
var path = require('path-extra');
var chokidar = require('chokidar');
var fs = require('fs');
var cloudinary = require('cloudinary')
var prettyjson = require('prettyjson');
require('shelljs/global');
var log = console.log.bind(console);
var userRootPath = path.homedir();
var syncDirPath = path.resolve(userRootPath,'Desktop','up2cloudinary');
var confPath = path.resolve(userRootPath,'cloudinary.conf');
console.log(syncDirPath)
console.log(confPath)


if (!fs.existsSync(confPath)){
    console.warn("you must set up a JSONfile names 'cloudinary.conf' in your ~ path");
    logExampleJSON();
    progress.exit();
}

function logExampleJSON(){
  console.warn("Example:")
    var exampleJSON = {
      cloud_name: 'your cloud name',
      api_key: 'your api key',
      api_secret: 'your api secret'
    };
    console.log(prettyjson.render(exampleJSON, {
      noColor: false
    }));
}

var configDic = JSON.parse(fs.readFileSync(confPath,'utf8'))

if (configDic) {
    cloudinary.config(configDic);
}else {
    console.warn("config file format errorh");
    logExampleJSON();
    progress.exit();
}

if (!fs.existsSync(syncDirPath)){
    fs.mkdirSync(syncDirPath);
}

function performUploadByFilePath(filePath){
    log(`File ${filePath} has been added`);

    // File uploader
    cloudinary.uploader.upload(filePath,function(result){
        var secure_url = result.secure_url;
        if(secure_url){
            var copy_string = '![](' + secure_url + ')';
            ncp.copy(copy_string,function(){
                notify({
                    type: 'pass',
                    title: '图床',
                    subtitle: '截图上传成功',
                    message: '链接已复制到剪切板',
                    group: 'watchdog4cloudinary',
                });
            });
        }else {

        }
      fs.unlinkSync(filePath);
    });

}

// One-liner for current directory, ignores .dotfiles
chokidar.watch( syncDirPath, {ignored: /[\/\\]\./}).on('add', path => {
    performUploadByFilePath(path);
});







