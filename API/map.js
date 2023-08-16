const map = {
  // 获取模糊位置
  FuzzyLocation() {
    wx.authorize({
      scope: 'scope.userFuzzyLocation',
      success() {
        return new Promise((resolve, reject) => {
          wx.getFuzzyLocation({
            type: 'wgs84',
            success(res) {
              resolve(res)
            },
            fail(err) {
              reject(err)
            }
          })
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  },
};
export default map;