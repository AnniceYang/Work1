
/**
 * 获取浏览器唯一标识
 * 同电脑不同浏览器值不同
 */
export default function browUID () {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var txt = 'http://zzcyi.com'
  ctx.textBaseline = 'top'
  ctx.font = "14px 'Arial'"
  ctx.textBaseline = 'tencent'
  ctx.fillStyle = '#f60'
  ctx.fillRect(125, 1, 62, 20)
  ctx.fillStyle = '#069'
  ctx.fillText(txt, 2, 15)
  ctx.fillStyle = 'rgba(102, 204, 0, 0.7)'
  ctx.fillText(txt, 4, 17)

  var b64 = canvas.toDataURL().replace('data:image/png;base64,', '')
  var bin = atob(b64)
  var crc = bin2hex(bin.slice(-16, -12))
  // var crc = bin.slice(-16,-12);
  return crc
//   alert(crc)
}

function bin2hex (str) {
  var result = ''
  for (let i = 0; i < str.length; i++) {
    result += int16Tohex(str.charCodeAt(i))
  }
  return result
}

function int16Tohex (i) {
  var result = i.toString(16)
  var j = 0
  while (j + result.length < 4) {
    result = '0' + result
    j++
  }
  return result
}
