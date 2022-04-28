const cloud = require('wx-server-sdk')

cloud.init({
  env: 'cloud1-6gokbkto6720cfce'
})
const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
  return db.collection('article').where({
    status:event.status,
    _id:event.ids //_id为数据库对应的id，event.ids为小程序传过来的id
  }).get()
}
