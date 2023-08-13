const updataUrl = 'http://recycleapi.haochentech.ltd/api/common/upload'
import getuserInfo from '../../API/getuserInfo';
Component({
  data: {
    // 本地存临时图片的数组
    originFiles: [],
    gridConfig: {
      column: 4,
      width: 160,
      height: 160,
    },
    config: {
      count: 1,
    },
  },
  methods: {
    async handleSuccess(e) {
      let that = this
      const {
        files
      } = e.detail;
      this.setData({
        originFiles: files,
      });
      console.log(this.data.originFiles)
    },
    // 上传图片方法
    async updataImg(files) {
      wx.showLoading({
        title: '上传图片', // 加载提示的文本
        mask: false // 是否显示透明蒙层，防止用户操作 
      });
      const data = await getuserInfo()
      const token = data.userinfo.token
      const id = data.area.id
      wx.uploadFile({
        url: updataUrl,
        filePath: files[0].url,
        name: 'file',
        header: {
          token,
          areaid: id
        },
        success: function (res) {
          console.log(res.data)
          let data = JSON.parse(res.data)
          let url = data.data.fullurl
          wx.hideLoading()
        },
        fail: function (error) {
          wx.showToast({
            title: error,
          })
        }
      });
    },
    // 删除临时图片
    handleRemove(e) {
      const {
        index
      } = e.detail;
      const {
        originFiles
      } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
  },
});