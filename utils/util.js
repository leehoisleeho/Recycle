/**
 * judge判断所需数据是否为空
 *  @param {Array} arr 
 *  judge的arr格式为[{field:'需要检查的变量名',msg:'xxx数据不能为空'}]
 *  status=0 必需数据有空值 status=1 必需数据都不为空值
 */
function judge(arr) {
  let status = 1
  for (let index = 0; index < arr.length; index++) {
    if(arr[index].field===""){
      console.log(arr[index].msg)
      wx.showToast({
        title:arr[index].msg,
        icon:'error'
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
function validate(phoneNumber){
  const chinesePhoneNumberPattern = /^1\d{10}$/; // 以1开头，后面跟10位数字
  return chinesePhoneNumberPattern.test(phoneNumber)
}

module.exports = {
  judge,validate
}