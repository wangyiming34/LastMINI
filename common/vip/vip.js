export default {
  vip_state () {
    var now = new Date().getTime()
    if (uni.getStorageSync("vipEnd")&& Number(uni.getStorageSync('isVip')) === 1) {
      var end = new Date(uni.getStorageSync("vipEnd")).getTime()
      if (now > end) {
        // 过期
        uni.setStorageSync('isVip', 0)
      } else {
        uni.setStorageSync('isVip', 1)
      }
    }
  }
}
