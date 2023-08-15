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
  getAddressList:(params)=>{
    return http({
      url: "/api/rubbish/Address/getList",
      method: "GET",
      data: params,
    });
  },
  // 添加地址
  addAddress:(params)=>{
    return http({
      url: "/api/rubbish/Address/addAddress",
      method: "POST",
      data: params,
    });
  },
  // 提交订单
  submitOrder:(params)=>{
    return http({
      url: "/api/rubbish/order/addOrder",
      method: "POST",
      data: params,
    });
  },
  // 获取订单详情
  getOrderDetails:(params)=>{
    return http({
      url: "/api/rubbish/order/orderDetail",
      method: "POST",
      data: params,
    });
  },
  // 取消订单
  cancelOrder:(params)=>{
    return http({
      url: "/api/rubbish/order/cancelOrder",
      method: "POST",
      data: params,
    });
  },
  // 提交意见反馈
  submitFeedBack:(params)=>{
    return http({
      url: "/api/rubbish/Suggestion/addSuggestion",
      method: "POST",
      data: params,
    });
  },
  // 获取所有品类价格
  getAllList:(params)=>{
    return http({
      url: "/api/rubbish/category/getAllList",
      method: "GET",
      data: params,
    });
  },
}
// 倒出接口
export default api;
