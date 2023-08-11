const map = {
  // 获取模糊位置
  FuzzyLocation() {
    return new Promise((resolve, reject) => {
      wx.getFuzzyLocation({
        type: "wgs84",
        success(res) {
          const latitude = res.latitude;
          const longitude = res.longitude;
          resolve({
            latitude,
            longitude,
          });
        },
        fail(err) {
          reject("开发环境不用管这个");
        },
      });
    });
  },
};

export default map;
