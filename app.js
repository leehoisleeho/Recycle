// app.js
import map from './API/map';
import {store} from './store/store.js';
App({
  onLaunch() {
    // 全局状态控制挂载到this上
    console.log(this);
    this.store = store;
    // 获取模糊位置
    // map.FuzzyLocation().then((res) => {
    //   console.log(res);
    // });
    // 登录
    wx.login({
      success: (res) => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    });
  },
});
