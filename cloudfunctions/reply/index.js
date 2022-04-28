// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-6gokbkto6720cfce'
})


exports.main = async (event, context) => {// 云函数入口函数
  const wxContext = cloud.getWXContext()
    await cloud.openapi.customerServiceMessage.send({
      "touser": wxContext.OPENID,
      "msgtype": 'text',
      text: {
        content: '您好！这里是clara的健身俱乐部，如有疑问请留言，客服人员马上为您解答~'
      }
    });
  return {
    msgtype: 'transfer_customer_service',
    ToUserName: 'touser',
    FromUserName: 'fromuser',
    CreateTime: parseInt(+new Date / 1000),
  }
 } 
// return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }