import {
  createStoreBindings
} from 'mobx-miniprogram-bindings'
import {
  store
} from "../../store/store";

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
  // 组件被添加到页面时执行的操作
  attached() {
    // 传入指针 this 实例化
    this.storeBindings = createStoreBindings(this, {
      store,
      // 数组形式需要与data同名
      actions: ['setImgUrlList'],
    })
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
      this.setImgUrlList(this.data.originFiles)
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
      this.setImgUrlList(this.data.originFiles)
    },
  },
});