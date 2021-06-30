// pages/showresult/showresult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("接收到的参数是str="+options.str);
  
    var insectsName=options.str
    wx.cloud.database().collection('insectsInfo')  //拿到表。双引号也行
    .where({//条件查询
      name: insectsName
    })
    .get()
    .then(res=>{//请求成功
  console.log('返回的数据',res)
  this.setData({
  list:res.data
  })
    })
     .catch(err=>{//请求失败
  console.log('请求失败',err)
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})