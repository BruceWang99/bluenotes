/*
 * @Author: your name
 * @Date: 2020-10-27 17:48:44
 * @LastEditTime: 2020-10-29 14:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /bluenotes/blogh5/ftp.js
 */
const FtpDeploy = require('ftp-deploy');

const ftpDeploy = new FtpDeploy();

const config = {
  user: 'brucewang_vip', // 用户名
  password: 'Ax5S6n5R6s4j2LwX', // 密码
  host: 'brucewang.vip', // ftp 主机地址
  port: 21, // 端口
  localRoot: `${__dirname}/dist`, // 本地资源路径
  remoteRoot: '/', // 远程资源路径
  include: ['*', '**/*'], // 包含文件
  exclude: ['dist/**/*.map', 'node_modules/**', 'node_modules/**/.*', '.git/**'], // 排除文件
  deleteRemote: true, // 上传前是否删除
  forcePasv: false, // 主动模式/被动模式
};
console.log('开始上传到服务器...');
// use with promises
ftpDeploy
  .deploy(config)
  .then((res) => console.log('上传成功', res))
  .catch((err) => console.log(err));
