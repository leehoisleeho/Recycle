// pages/feedback/feedback.js
import api from '../../API/api'
import {
  judge,
  validate
} from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    inputval: '',
    textareaVal: '',
    imgUpdatUrl: 'https://recycleapi.hellochange.online/api/common/upload',
    imgStr: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  /** 方法
   * handleAdd 添加图片
   * handleRemove 删除图片
   * updataImg 图片上传到服务器
   * inputchange 监听input数据变化
   * textareachange 监听textarea数据变化
   * submit 提交
   * judge 判断表单所需数据是否为空
   * onblur input失去焦点
   * validate 判断是否是正确的电话号码
   * */

  handleAdd(e) {
    const {
      fileList
    } = this.data;
    const {
      files
    } = e.detail;
    this.setData({
      fileList: [...fileList, ...files], // 此时设置了 fileList 之后才会展示选择的图片
    });
  },
  handleRemove(e) {
    const {
      index
    } = e.detail;
    const {
      fileList
    } = this.data;
    fileList.splice(index, 1);
    this.setData({
      fileList,
    });
  },
  // 上传图片方法 并且拼接字符串
  async updataImg(files) {
    let that = this;
    wx.showLoading({
      title: "上传图片", // 加载提示的文本
      mask: false, // 是否显示透明蒙层，防止用户操作
    });
    let token = wx.getStorageSync("token")
    let id = wx.getStorageSync("id")
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: this.data.imgUpdatUrl,
        filePath: files,
        name: "file",
        header: {
          token,
          areaid: id,
        },
        success: function (res) {
          resolve("ok")
          let data = JSON.parse(res.data);
          let url = data.data.fullurl;
          let imgStr = that.data.imgStr
          if (imgStr === "") {
            imgStr = url
          } else {
            imgStr = imgStr + ',' + url
          }
          that.setData({
            imgStr,
          });
          wx.hideLoading();
        },
        fail: function (error) {
          reject(error);
          wx.hideLoading();
          console.log(error);
        },
      });
    });
  },
  /* Input */
  inputchange(e) {
    this.setData({
      inputval: e.detail.value
    })
  },
  onblur() {
    if (!validate(this.data.inputval)) {
      wx.showToast({
        title: '请输入正确的电话号码',
        icon: 'error'
      })
      this.setData({
        inputval: ''
      })
    }
  },
  /* textarea */
  textareachange(e) {
    this.setData({
      textareaVal: e.detail.value
    })
  },
  async submit() {
    let input = this.data.inputval
    let text = this.data.textareaVal
    let imgStr = this.data.imgStr
    let list = this.data.fileList;
    const promises = list.map((item) => {
      return this.updataImg(item.url);
    });
    const results = await Promise.all(promises); // 等待所有图片请求完成
    let judgeArr = [{
        field: input,
        msg: '联系号码不能为空'
      },
      {
        field: text,
        msg: '意见反馈不能为空'
      },
    ]
    let code = judge(judgeArr)
    if (code !== 0) {
      let res = await api.submitFeedBack({
        content: text,
        images: imgStr,
        mobile: input
      })
      wx.switchTab({
        url: '/pages/user/user',
      })
    }
  },
})