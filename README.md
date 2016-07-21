# watchdog4cloudinary
监听Mac系统截图自动上传到cloudinary并返回截图的url


### before

* 首先你需要有一个[cloudianry](http://cloudinary.com/)账号

### install

```
npm install -g watchdog4cloudinary
```

### setup

```
cd ~ && vim cloudinary.conf
```

然后编辑输入你的cloudiany信息并保存

```
{
  "cloud_name": "your cloud name",
  "api_key": "your api key",
  "api_secret": "your api secret"
}
```

### usage

第一次使用需要先修改Mac系统截图自动保存的目录

```
mkdir ~/Desktop/up2cloudinary
sudo defaults write com.apple.screencapture location ~/Desktop/up2cloudinary/
killall SystemUIServer
```

然后终端输入即可开启监听模式

```
watchdog4cloudinary
```

每次触发Mac系统截屏 (快捷键`cmd`+`shift`+`4`)，都会在`~/Destop/up2cloudinary`目录下的生成并上传[cloudianry](http://cloudinary.com/)，上传成功后会自动复制链接到剪切板


