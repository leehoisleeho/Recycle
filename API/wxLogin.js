function wxLogin(){
  return new Promise((resolve,reject)=>{
    wx.login({
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject('123')
      }
    });
  })
}
export default wxLogin;