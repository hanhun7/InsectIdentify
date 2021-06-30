// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env:"recognition-5y2oz"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //order
      return db.collection('insectsInfo').get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }

}