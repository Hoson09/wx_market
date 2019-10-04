// pages/index/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: ['/assets/img/swiper1.png', '/assets/img/swiper2.png', '/assets/img/swiper3.png', '/assets/img/swiper4.png'],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    goodItemImg: ['/assets/img/p1.png', '/assets/img/p2.png', '/assets/img/p3.png'],
    h1: 0,
    h2: 0,
    m1: 0,
    m2: 0,
    s1: 0,
    s2: 0,
    timer: null,
    timeIndex: -1,
    timeArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //把时钟时间注册到时钟数组中，让所有的时钟事件共享一个时钟对象，避免不必要的开销。
    this.data.timeArr.push(this.upDateMsTimer);
    //初始化页面时钟
    // console.log('timeArr:', this.data.timeArr[0]);
    this.data.timer = setInterval(() => {
      this.data.timeIndex += 1;
      this.setData({
        timeIndex: this.data.timeIndex
      })
      this.data.timeIndex = this.data.timeIndex % 100;
      for (let i = 0; i < this.data.timeArr.length;i++){
        this.data.timeArr[0]();
      }
      // this.upDateMsTimer();//这是之前只运行一个时钟事件的函数的写法。
    }, 200);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    //页面卸载的时候清除时钟
    clearInterval(this.data.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  getHourMinSecondByMs(ms) {
    ms = +ms;
    if (ms < 0) {
      return null;
    }
    let hours = parseInt((ms / (1000 * 60 * 60)) % 24);
    let hourStr = ('0' + hours).slice(-2);
    let mins = parseInt((ms / (1000 * 60)) % 60);
    let minStr = ('0' + mins).slice(-2);
    let seconds = parseInt((ms / 1000) % 60);
    let secStr = ('0' + seconds).slice(-2);
    let timeStr = hourStr + minStr + secStr;
    return timeStr.split('');
  },
  upDateMsTimer() {
    //this.timeIndex 是从1到100往复循环
    // console.log('this.data.timeIndex', this.data.timeIndex);
    if (this.data.timeIndex % 5 != 0) {
      return;
    }
    //对5取余为0的时候，说明这个时间满一秒了。需要执行函数 获得时间差，并进行相当的操作
    let curTime = new Date();
    let year = curTime.getFullYear();
    let month = curTime.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let day = curTime.getDate();
    day = day > 9 ? day : '0' + day;
    let deadLine = `${year}-${month}-${day} 23:59:59`;
    let deadLineDate = new Date(deadLine);
    let nowDate = new Date();
    console.log('deadLineDate:', deadLineDate, 'nowDate', nowDate, 'deadLineDate-nowDate', deadLineDate - nowDate);
    let tempArr = this.getHourMinSecondByMs(deadLineDate - nowDate);
    console.log('tempArr:', tempArr);
    this.setData({
      h1: tempArr[0],
      h2: tempArr[1],
      m1: tempArr[2],
      m2: tempArr[3],
      s1: tempArr[4],
      s2: tempArr[5]
    });
  },
  navToMorePage(){
    wx.navigateTo({
      url: '/pages/more/index'
    });
  }

})