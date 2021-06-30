const app = getApp()
Page({
  data: {
    // StatusBar: app.globalData.StatusBar,
    // CustomBar: app.globalData.CustomBar,
    // Custom: app.globalData.Custom,
    // TabCur: 0,
    // MainCur: 0,
    // VerticalNavTop: 0,
    list: []
    //load: true
  },


  onLoad: function (options) {
    let that = this;
    //1、引用数据库
    //const db = wx.cloud.database({ envs: "tjnk3u19"})
    // const db = wx.cloud.database({});
    // const cont = db.collection('insectsInfo');
    //2、开始查询数据了  news对应的是集合的名称
    wx.cloud.callFunction({
      name:"add",
      success(res){
        console.log("chenggong",res)
        that.setData({
          list: res.result.data
        })
      },
      fail(res){
        console.log("shibai",res)
      }
    })
    // cont.get({
    //   //如果查询成功的话
    //   success: res => {
    //     //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值
    //     this.setData({
    //       list: res.data
    //     })
    //   }
    // })

  },
  onReady() {
    wx.hideLoading()
  },

  
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    })
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i]._id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;     
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i]._id - 1) * 50,
          TabCur: list[i]._id
        })
        return false
      }
    }
  },
  suo: function (e) {
    wx.navigateTo({
      url: '../search/search',
    })
  }
})
