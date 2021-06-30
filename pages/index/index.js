// index.js
// 获取应用实例
var util = require('../../utils/util.js')
const DB = wx.cloud.database().collection("history")

Page({
  //上传图片
   add(){
        let that = this;
        console.log("点击了上传")

        wx.showActionSheet({
          itemList: ['拍照', '从相册选择'],
          itemColor: '',
          //成功时回调
          success: function (res) {
            if (!res.cancel) {
              /*
               res.tapIndex返回用户点击的按钮序号，从上到下的顺序，从0开始
               比如用户点击本例中的拍照就返回0，相册就返回1
               我们res.tapIndex的值传给chooseImage()
              */
              that.chooseImage()
              // that.addData()
            }
          },
          //失败时回调
          fail: function (res) {
            console.log('调用失败')
           },
          complete: function (res) { },
        })

   },
      
    chooseImage(){
       let that = this;
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success (res) {
            // tempFilePath可以作为img标签的src属性显示图片
            console.log("选择成功",res)
            that.uploadImg(res.tempFilePaths[0]);
            upload(that, res.tempFilePaths);
          }
        })
    },

    addData(fileID){
        var TIME = util.formatDate(new Date());
        DB.add({
          data:{
            detection_location:"四川大学",
            detection_pic_url:fileID,
            date:TIME
          },
          success(res){
            console.log("添加成功",res)
          },
          fail(res){
            console.log("添加失败",res)
          }
        })
    },
    uploadImg(fileUrl){
      let that = this
        wx.cloud.uploadFile({
          cloudPath:  new Date().getTime() +'.png', // 上传至云端的路径
          // cloudPath: 'gakki.png',
          filePath: fileUrl, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log("上传成功",res)
            that.addData(res.fileID);
          },
          fail: console.error
        })
      },

})
function sou(e) {
  wx.navigateTo({
    url: '../showresult/showresult',
  })
}
function upload(page, path) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  }),
    wx.uploadFile({
      url: 'https://hz.matpool.com:28892?token=kswkQoJaZ3' ,
      filePath: path[0], 
      name: 'picture',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
      },
      success: function (res) {
        console.log(res);
        if (res.statusCode != 200) { 
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
          return;
        }
        var data = JSON.parse(res.data)
        wx.navigateTo({ 
          url: '/pages/showresult/showresult?str='+data.pre_labels_name, 
         }) 
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();  //隐藏Toast
      }
    })
}
  


 
