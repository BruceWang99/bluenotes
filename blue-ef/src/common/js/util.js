import CryptoJS from 'crypto-js'

export function friendlyDate(dateStr) {
  let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
  let time = dateObj.getTime()
  let now = Date.now()
  let space = now - time
  let str = ''

  switch (true) {
    case space < 1000 * 60:
      str = '刚刚'
      break
    case space < 1000 * 3600:
      str = Math.floor(space / (1000 * 60)) + '分钟前'
      break
    case space < 1000 * 3600 * 24:
      str = Math.floor(space / (1000 * 3600)) + '小时前'
      break
    default:
      str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
      break
  }
  return str
}

export function getFullDate(dateStr) {
  return ''
  let lastDotIndex = dateStr.lastIndexOf('.')
  dateStr = dateStr.substring(0, lastDotIndex)
  return dateStr.split('T').join(' ')
}

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEG");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123418');   //十六位十六进制数作为密钥偏移量

/**
 * CryptoJS加密
 */
export function getAES(word){ //加密
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

/**
* CryptoJS解密
*/
export function getDAes(word){//解密
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}