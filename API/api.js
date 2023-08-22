// 获取重要通知接口
import http from "./http";
const api = {
  // 获取重要通知接口
  getImportantNotice: (params) => {
    return http({
      url: "/api/rubbish/notice/getDetail",
      method: "GET",
      data: params,
    });
  },
  // 获取轮播图接口
  getSwiperList: (params) => {
    return http({
      url: "/api/rubbish/banners/getList",
      method: "GET",
      data: params,
    });
  },
  // 获取品类列表接口
  getCategoryList: (params) => {
    return http({
      url: "/api/rubbish/category/getList",
      method: "GET",
      data: params,
    });
  },
  // 获取订单列表接口
  getOrderList: (params) => {
    return http({
      url: "/api/rubbish/order/getOrderList",
      method: "GET",
      data: params,
    });
  },
  // 提交订单页面 品类信息
  getCategoryInfo: (params) => {
    return http({
      url: "/api/rubbish/categorylist/getList",
      method: "GET",
      data: params,
    });
  },
  // 获取地址列表
  getAddressList: (params) => {
    return http({
      url: "/api/rubbish/Address/getList",
      method: "GET",
      data: params,
    });
  },
  // 添加地址
  addAddress: (params) => {
    return http({
      url: "/api/rubbish/Address/addAddress",
      method: "POST",
      data: params,
    });
  },
  // 提交订单
  submitOrder: (params) => {
    return http({
      url: "/api/rubbish/order/addOrder",
      method: "POST",
      data: params,
    });
  },
  // 获取订单详情
  getOrderDetails: (params) => {
    return http({
      url: "/api/rubbish/order/orderDetail",
      method: "POST",
      data: params,
    });
  },
  // 取消订单
  cancelOrder: (params) => {
    return http({
      url: "/api/rubbish/order/cancelOrder",
      method: "POST",
      data: params,
    });
  },
  // 提交意见反馈
  submitFeedBack: (params) => {
    return http({
      url: "/api/rubbish/Suggestion/addSuggestion",
      method: "POST",
      data: params,
    });
  },
  // 获取所有品类价格
  getAllList: (params) => {
    return http({
      url: "/api/rubbish/category/getAllList",
      method: "GET",
      data: params,
    });
  },
  // 更新用户昵称
  updataUserName: (params) => {
    return http({
      url: "/api/user/updateUserName",
      method: "POST",
      data: params,
    });
  },
  // 更新用户头像
  updataUserAvatar: (params) => {
    return http({
      url: "/api/user/updateUserAvatar",
      method: "POST",
      data: params,
    });
  },
  // 获取用户头像和昵称
  getUserInfo: (params) => {
    return http({
      url: "/api/user/getUserInfo",
      method: "GET",
      data: params,
    });
  },
  // 上传图片接口
  upImg: (tempFile) => {
    wx.showLoading({
      title: '图片上传中', // 加载提示的文本
      mask: false // 是否显示透明蒙层，防止用户操作 
    });
    let token = wx.getStorageSync("token")
    let id = wx.getStorageSync("id")
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: 'https://recycleapi.hellochange.online/api/common/upload',
        filePath: tempFile,
        name: 'file',
        header: {
          token: token,
          areaid: id
        },
        success(res) {
          resolve(res)
          wx.hideLoading()
        },
        fail(err) {
          reject(err)
          wx.showToast({
            title: '上传失败',
            icon: 'error'
          })
        }
      })
    })
  },
  //招募合伙人
  invite: (params) => {
    return http({
      url: "/api/rubbish/Article/invite",
      method: "GET",
      data: params,
    });
  },
  //关于我们
  getAbout: (params) => {
    return http({
      url: "/api/rubbish/Article/about",
      method: "GET",
      data: params,
    });
  },
  // 员工登录接口
  staffLogin: (params) => {
    return http({
      url: "/api/user/workerLogin",
      method: "POST",
      data: params,
    });
  },
  //获取员工订单列表
  staffOrderList: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/getWorkerList",
      method: "GET",
      data: params,
      workerId:workerId
    });
  },
  //员工接单
  takeOrder: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/takeOrder",
      method: "GET",
      data: params,
      workerId:workerId
    });
  },
  // 获取员工订单详情
  getStaffOrderDetails: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/getOrderDetail",
      method: "GET",
      data: params,
      workerId:workerId
    });
  },
  // 完成订单
  finishOrder: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/complete",
      method: "POST",
      data: params,
      workerId:workerId
    });
  },
  // 员工取消订单
  staffCanceOrder: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/cancelOrder",
      method: "POST",
      data: params,
      workerId:workerId
    });
  },
  // 获取员工列表
  getStaffList: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/getWorkerUserList",
      method: "GET",
      data: params,
      workerId:workerId
    });
  },
  // 员工转单
  transferOrder: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/transferOrder",
      method: "POST",
      data: params,
      workerId:workerId
    });
  },
  // 员工请假
  staffLeave: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/leave",
      method: "POST",
      data: params,
      workerId:workerId
    });
  },
  // 员工复工
  staffReturnWork: (params) => {
    let workerId = wx.getStorageSync("workerId")
    return http({
      url: "/api/rubbish/worker/work",
      method: "POST",
      data: params,
      workerId:workerId
    });
  },
}
// 倒出接口
export default api;