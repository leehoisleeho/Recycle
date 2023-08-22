/**
 * judge判断所需数据是否为空
 *  @param {Array} arr 
 *  judge的arr格式为[{field:'需要检查的变量名',msg:'xxx数据不能为空'}]
 *  status=0 必需数据有空值 status=1 必需数据都不为空值
 */
function judge(arr) {
  let status = 1
  for (let index = 0; index < arr.length; index++) {
    if (arr[index].field === "") {
      console.log(arr[index].msg)
      wx.showToast({
        title: arr[index].msg,
        icon: 'error'
      })
      status = 0
      break
    }
  }
  return status
}
/**
 * 检测输入的是不是手机号
 * @param {string} phoneNumber 
 */
function validate(phoneNumber) {
  const chinesePhoneNumberPattern = /^1\d{10}$/; // 以1开头，后面跟10位数字
  return chinesePhoneNumberPattern.test(phoneNumber)
}

/**
 * 时间戳转时间方法
 * Timestamp
 */
function TimestampToTime(Timestamp) {
  // 使用Date对象进行转换
  const date = new Date(Timestamp * 1000); // JavaScript中的时间戳是毫秒级别的，所以需要乘以1000
  // 获取日期的各个部分
  const year = date.getFullYear(); // 年份
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份（注意：月份从0开始，所以要加1），补零
  const day = date.getDate().toString().padStart(2, '0'); // 日，补零
  const hours = date.getHours().toString().padStart(2, '0'); // 小时，补零
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 分钟，补零
  const seconds = date.getSeconds().toString().padStart(2, '0'); // 秒，补零
  // 格式化为字符串
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate
}


module.exports = {
  judge,
  validate,
  TimestampToTime
}