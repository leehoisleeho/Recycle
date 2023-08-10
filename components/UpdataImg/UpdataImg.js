Component({
  data: {
    originFiles: [
     
    ],
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
    handleSuccess(e) {
      const { files } = e.detail;
      this.setData({
        originFiles: files,
      });
    },
    handleRemove(e) {
      const { index } = e.detail;
      const { originFiles } = this.data;
      originFiles.splice(index, 1);
      this.setData({
        originFiles,
      });
    },
    handleClick(e) {
      console.log(e.detail.file);
    },
  },
});
