// pages/search/search.js
Page({
  data:{
    list:[]
  },

   onLoad() {
 
     console.log('启动啦')
     var info;
      this.setData({
        info : data[0].description
      })
       //es6的简介写法
      
 
   },

//    searchValueInput(event){

//         // 1. 获取数据库引用
//      const db = wx.cloud.database()
// // 2. 构造查询语句
// // collection 方法获取一个集合的引用
// // where 方法传入一个对象，数据库返回集合中字段等于指定值的 JSON 文档。API 也支持高级的查询条件（比如大于、小于、in 等），具体见文档查看支持列表
// // get 方法会触发网络请求，往数据库取数据
//      db.collection('insectsInfo').where({
//       publishInfo: {
//       name: '白星花金龟'
//       }
//       }).get({
//       success: function(res) {
//     // 输出 [{ "title": "The Catcher in the Rye", ... }]
//         console.log("搜索成功",res)
//       }
//     })
//    }
searchValueInput(e){
  
  var insectsName=e.detail.value
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

 
   
 })
