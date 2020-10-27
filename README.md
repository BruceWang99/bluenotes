# bluenotes


## 后端项目

### 本地运行

```bash
$ npm i
$ npm run dev
$ open http://localhost:8282/
```

### 服务器发布

```bash
$ npm start
$ npm stop
```

## 前端项目
> 目录是 /blogh5

### 本地运行
```
$ npm i
$ npm run dev // 运行网页版
$ npm run electron:serve // 运行桌面客户端
```
### 打包

```
npm run build // 打包网页版
npm run electron:build // 打包桌面客户端
```
### tips
(1) /config、database/config.json 文件下的数据库配置文件自行添加, 详情可参照 ***.example文件
(2) blogh5/ftp.js 可配置前端项目的自动化部署到ftp服务器, 详情可参照 ***.example文件
