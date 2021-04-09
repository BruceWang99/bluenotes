# bluenotes
> 这是一个线上云笔记+blog系统, 可在线记录、保存云笔记, 并直接发布到自己的博客上

云笔记系统预览地址: http://www.brucewang.vip/login
云博客预览地址: http://www.brucewang.vip/blog
## 整体项目

```bash
npm i // 安装monorepo依赖
npm install lerna -g
lerna bootstrap // 安装子项目的依赖
```

## 后端项目(blue-api)

### 本地运行

```bash
$ lerna run dev:api
$ open http://localhost:8282/
```

### 服务器运行

```bash
$ lerna run start:api
$ lerna run stop:api
```

### tips
* /config、database/config.json 文件下的数据库配置文件自行添加, 详情可参照 ***.example文件

## 前端项目(blueh5)

### 本地运行
```
$ lerna run dev:h5 // 运行网页版
$ lerna run electron:serve // 运行桌面客户端
```
### 打包

```
lerna run build:h5 // 打包网页版
lerna run electron:build // 打包桌面客户端
```
### tips
* blogh5/ftp.js 可配置前端项目的自动化部署到ftp服务器, 详情可参照 ***.example文件
