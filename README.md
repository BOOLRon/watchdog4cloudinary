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

终端输入即可开启监听模式

```
watchdog4cloudinary
```

每次触发Mac系统截屏 (快捷键`cmd`+`shift`+`4`)，都会在`~/Destop/up2cloudinary`目录下的生成并上传[cloudianry](http://cloudinary.com/)，并返回：


```
{ public_id: 'bgdomzedck7n4i4t794w',
  version: 1461150597,
  signature: '637f38cd2db14dca9dda8e3d0459b19e9152fbde',
  width: 164,
  height: 133,
  format: 'png',
  resource_type: 'image',
  created_at: '2016-04-20T11:09:57Z',
  tags: [],
  bytes: 1523,
  type: 'upload',
  etag: 'b3a1ed736941c8dbee1649bbc4b2c5e6',
  url: 'http://res.cloudinary.com/boolron/image/upload/v1461150597/bgdomzedck7n4i4t794w.png',
  secure_url: 'https://res.cloudinary.com/boolron/image/upload/v1461150597/bgdomzedck7n4i4t794w.png',
  original_filename: 'Screen Shot 2016-04-20 at 7.09.53 PM' 
}
```

