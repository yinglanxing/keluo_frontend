<!--
   name:自定义签到日历组件
   date:2019-8-16
   des:用来操作当月签到信息，补签等
   感谢 @biemo 提供的签到组件
   link: https://github.com/biemo8
 -->
<template>
  <div class="signCalendar">
    <div class="top-bar" v-show="showTop">
      <span class="pointer" :style="canPrev?'':'color: #8F8F8F'" @click="clickPrev"><</span>
      {{y}}{{text.year}}{{m}}{{text.month}}
      <span class="pointer" :style="canNext?'':'color: #8F8F8F'" @click="clickNext">></span>
    </div>
    <div class="week" :style="showTop ? 'border-bottom:0' :'' ">
      <span class="week-day" v-for="(item,index) in weekDay" :key="index">{{item}}</span>
    </div>
    <div
      :class="{'hide' : !monthOpen}"
      class="content"
      :style="{
        height: (dates.length / 7) * 40 + 'px'
      }"
    >
      <div :style="{ top : positionTop + 'px' }" class="days">
        <span
          v-for="(item,index) in dates"
          :key="index"
          class="selectOne"
          :class="{
              nolm: !item.lm,
              signed:isSigned(item.year, item.month, item.date),
              today: isToday(item.year, item.month, item.date)
           }"
        >
          <em  style="cursor: pointer" @click.stop="!unClick ? selectOne(item,$event):''">{{item.date}}</em>
          <i></i>

          <b v-if="isToday(item.year, item.month, item.date) ">今</b>
          <span v-if="calendarListDate.get(item.year+'-'+item.month +'-'+ item.date)" class="festival">{{calendarListDate.get(item.year+'-'+item.month +'-'+ item.date)}}</span>

        </span>
      </div>
    </div>
    <div @click="trgWeek()" :class="{down:!monthOpen}" class="weektoggel" v-if="showOpenBtn"></div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "signCalendar",
  props: {
    //第一列星期几
    weekStart: {
      type: Number,
      default: 7
    },
    //已经签到的日期
    signedDates: {
      type: Array,
      default: null
    },
    chooseDates: {
      type: Array,
      default: null
    },
    //最大可选择数
    maxChoose: {
      type: Number,
      default: 0
    },
    //选择回调
    chooseCallBack: {
      type: Function,
      default() {
        return () => {};
      }
    },
    //是否展开
    open: {
      type: Boolean,
      default: true
    },
    //显示顶部
    showTop: {
      type: Boolean,
      default: true
    },
    //显示底部伸缩按钮
    showOpenBtn: {
      type: Boolean,
      default: true
    },
    //禁用点击事件
    unClick: {
      type: Boolean,
      default: false
    },
    calendarList: {
      type: Array,
      default: null
    }
  },
  watch: {
    chooseDates: function (newValue, oldValue) {
      console.log("回调2", newValue)
    },
    calendarList: function () {
      let tmpList = this.calendarList
      for(let i in tmpList){
        //日期改变格式 2022-07-07  变为 2022-7-7
        let dateFormat = this.dislodgeZero(tmpList[i].date)
        if (tmpList[i].isOffDay == "false") {
          this.calendarListDate.set(dateFormat , '班')
        }else {
          this.calendarListDate.set(dateFormat , tmpList[i].name)
        }
      }
    }
  },
  data() {
    return {
      el: null,
      text: {
        year: "年",
        month: "月",
        week: ["一", "二", "三", "四", "五", "六", "日"],
        today: "今"
      },
      y: new Date().getFullYear(), //年
      m: new Date().getMonth() + 1, //月
      dates: [], //当前月日期集合
      positionTop: 0,
      monthOpen: true,
      canPrev: true,
      canNext: false,
      nextCount: 0,
      calendarListDate: new Map(),
    };
  },
  created() {
    this.dates = this.monthDay(this.y, this.m);
    !this.open && this.trgWeek();
  },
  mounted() {
    this.el = document.querySelector(".signCalendar");
  },
  computed: {
    //顶部星期栏目
    weekDay() {
      return this.text.week
        .slice(this.weekStart - 1)
        .concat(this.text.week.slice(0, this.weekStart - 1));
    }
  },
  methods: {
    ...mapMutations(['setLoginMessage']),
    dislodgeZero: function (str) {
      if (str != undefined){
        let strArray = str.split("-");
        strArray = strArray.map(function(val) {
          if (val[0] == "0") {
            return (val = val.slice(1));
          } else {
            return val;
          }
        });
        return strArray.join("-");
      }
    },
    // 点击上一页
    clickPrev: function () {
      this.nextCount = this.nextCount - 1
      if (this.nextCount < -10) {
        this.nextCount = this.nextCount + 1
        this.canNext = true
        this.canPrev = false
        return
      } else {
        this.canNext = true
        this.canPrev = true
      }

      let year,lastMonth;
      // let date = new Date(this.y, this.m, 1);
      // let nowYear = date.getFullYear();   //当前年：四位数字
      // let nowMonth = date.getMonth();     //当前月：0-11

      let nowYear = this.y;   //当前年：四位数字
      let nowMonth = this.m;     //当前月：0-11
      if (nowMonth == 1) {   //如果是0，则说明是1月份，上一个月就是去年的12月
        year = nowYear - 1;
        lastMonth = 12;
      }else {
        //不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
        year = nowYear;
        lastMonth = nowMonth - 1;
      }
      console.log("减后的当前月份", lastMonth)
      console.log("减后的当前年份", year)

      this.y = year
      this.m = lastMonth
      console.log("减后的日期：", this.y, this.m)


      this.dates = this.monthDay(this.y, this.m);
      this.cleanSelect()
      // lastMonth = lastMonth+1;
      if (lastMonth < 10){
        lastMonth = '0'+lastMonth;
      }
      let dateStr = year + "-"+ (lastMonth)
      console.log("减后的年份", dateStr)
      this.$emit("handlePrev", dateStr);
      console.log("上个月的集合", this.dates)
    },
    // 点击下一页
    clickNext: function () {
      this.nextCount = this.nextCount + 1
      console.log("nextCount", this.nextCount)
      if (this.nextCount > 0) {
        this.canNext = false
        this.canPrev = true
        this.nextCount = this.nextCount - 1
        return
      } else {
        this.canNext = true
        this.canPrev = true
      }
      let year,lastMonth;
      // let date = new Date(this.y, this.m, 1);
      // let nowYear = date.getFullYear();   //当前年：四位数字
      // let nowMonth = date.getMonth();     //当前月：0-11

      let nowYear = this.y;
      let nowMonth = this.m;

      console.log("当前月份", nowMonth)
      console.log("当前年份", nowYear)

      if (nowMonth == 12) {   //如果是0，则说明是1月份，上一个月就是去年的12月
        year = nowYear + 1;
        lastMonth = 1;
      }else {
        //不是1月份，年份为当前年，月份本来是要减1的，但是由于`getMonth()`的月份本身就是少了1的，所以月份不用变。
        year = nowYear;
        lastMonth = nowMonth + 1;
      }

      console.log("加的当前月份", year)
      console.log("加后的当前年份", lastMonth)

      this.y = year
      this.m = lastMonth
      this.dates = this.monthDay(this.y, this.m);
      // lastMonth = lastMonth + 1;
      if (lastMonth<10){
        lastMonth = '0'+lastMonth;
      }
      let dateStr = year + "-"+ (lastMonth)
      this.cleanSelect()
      console.log("加后的年份", dateStr)
      this.$emit("handleNext", dateStr);
      console.log("下个月的集合", this.dates)
    },
    cleanSelect: function () {
      let lists = document.getElementsByClassName("selectOne");
      for (let i = 0; i < lists.length; i++) {
        lists[i].classList.remove("choose");
      }
    },
    //小于10格式化
    // zero(n) {
    //   return n < 10 ? "0" + n : n;
    // },
    //获取当前月份天数
    monthDay(y, m) {
      let firstDayOfMonth = new Date(y, m-1, 1).getDay(); // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m, 0).getDate(); // 上一月的最后一天
      let dates = []; // 所有渲染日历
      let weekStart = this.weekStart == 7 ? 0 : this.weekStart; // 方便进行日期计算，默认星期从0开始

      let startDay = (() => {
        // 周初有几天是上个月的
        if (firstDayOfMonth == weekStart) {
          return 0;
        } else if (firstDayOfMonth > weekStart) {
          return firstDayOfMonth - weekStart;
        } else {
          return 7 - weekStart + firstDayOfMonth;
        }
      })();
      let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
      for (let i = 1; i <= startDay; i++) {
        dates.push({
          date: lastDayOfLastMonth - startDay + i,
          day: weekStart + i - 1 || 7,
          month: m - 1 >= 0 ? m - 1 : 12,
          year: m - 1 >= 0 ? y : y - 1
        });
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        dates.push({
          date: j,
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: m,
          year: y,
          lm: true
        });
      }
      for (let k = 1; k <= endDay; k++) {
        dates.push({
          date: k,
          day: (lastDateOfMonth + startDay + weekStart + k - 1) % 7 || 7,
          month: m + 1 <= 11 ? m + 1 : 0,
          year: m + 1 <= 11 ? y : y + 1
        });
      }
      return dates;
    },
    //已经签到处理
    isSigned(y, m, d) {
      if (m<10){
        m = '0'+m;
      }
      if (d<10){
        d = '0'+d;
      }
      // console.log("校验是否签到", `${y}-${m}-${d}`, this.signedDates)
      let flag = false;
      for (let i = 0; i < this.signedDates.length; i++) {
        let dy = `${y}-${m}-${d}`;
        // console.log("已经签到", dy, this.signedDates[i])
        if (this.signedDates[i] == dy) {

          flag = true;
          break;
        }
      }

      return flag;
    },
    isCalendar(itm, item) {
      const data = itm.date.split('-')
      let m1 = item.month + '';
      let d1 = item.date + '';
      if (m1.length == 1){
        m1 = '0' + m1
      }
      if (d1.length == 1){
        d1 = '0' + d1
      }
      if (data[1] == m1 && data[2] == d1) {
        console.log(itm.name)
      }
      return data[1] == m1 && data[2] == d1
    },
    isToday(y, m, d) {
      let date = new Date();
      return (
        y == date.getFullYear() && m == date.getMonth() + 1 && d == date.getDate()
      );
    },
    //切换成周模式
    trgWeek() {
      this.monthOpen = !this.monthOpen;
      if (this.monthOpen) {
        this.positionTop = 0;
      } else {
        let index = -1;
        this.dates.forEach((i, x) => {
          this.isToday(i.year, i.month, i.date) && (index = x);
        });
        this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 40;
      }
    },
    //点击回调
    selectOne(i, event) {
      console.log("点击", event)
      let isLogin = this.$store.state.user.isLogin
      // 判断是否登录
      if (!isLogin) {
        this.isSignIn = false
        // 未登录，自动弹出登录框
        this.setLoginMessage(Math.random())
        return;
      }
      console.log("选择日期", i)
      if (!i.lm) {
        this.$commonUtil.message.error("无法选择该日期")
        return
      }
      let year = i.year;
      // let month = i.month + 1;
      let month = i.month;
      let date = i.date;
      if (month<10){
        month = '0'+month;
      }
      if (month > 12) {
        this.$commonUtil.message.error("无法选择该日期")
        return false;
      }
      if (date > 31) {
        this.$commonUtil.message.error("无法选择该日期")
        return false;
      }

      if (this.isToday(i.year, i.month, i.date)) {
        this.$commonUtil.message.error("今日无需补签，请点击签到按钮")
        return false;
      }

      if (date<10){
        date= '0'+date;
      }
      let dy = year+'-'+month+'-'+date;
      console.log("dy", dy)

      let dy1 = `${i.year}-${i.month}-${i.date}`;
      console.log("dy1", dy1)

      let dy2 = `${this.y}-${this.m + 1}-1`;
      console.log("dy2", dy2)

      let selectD = new Date(i.year, i.month - 1, i.date);
      let todayD = new Date();
      let firstD = new Date(this.y, this.m, 1);

      // console.log("selectD", selectD.getFullYear(), selectD.getMonth(), selectD.getDate())
      // console.log("todayD",  todayD.getFullYear(),  todayD.getMonth(),  todayD.getDate())
      // console.log("firstD",  firstD.getFullYear(),  firstD.getMonth(),  firstD.getDate())
      //
      //
      // console.log("校验判断",  selectD > todayD)
      // console.log("校验判断2",         (selectD.getFullYear() >= todayD.getFullYear() &&
      //   selectD.getMonth() >= todayD.getMonth() + 1 &&
      //   selectD.getDate() >= todayD.getDate()) )
      // console.log("权限判断3", this.signedDates.includes(dy))

      if (
        selectD > todayD ||
        (selectD.getFullYear() >= todayD.getFullYear() &&
          selectD.getMonth() >= todayD.getMonth() + 1 &&
          selectD.getDate() >= todayD.getDate()) ||

        this.signedDates.includes(dy)
      ) {
        console.log("不在可选范围内")
        return false;
      }
      //如果已存在就删除，不存在则添加
      let ind = this.chooseDates.findIndex(value => {
        return value == dy;
      });
      console.log("判断选中是否存在", ind)
      let parDom = event.srcElement.parentNode;
      if (
        ind === -1 &&
        (this.chooseDates.length < this.maxChoose || this.maxChoose === 0)
      ) {
        //超出限制
        if (this.chooseDates.length >= this.maxChoose){
          this.$commonUtil.message.error("暂无补签卡，通过活跃用户排行榜每周会发放哟~")
          return false;
        }
        this.chooseDates.push(dy);
        parDom.classList.add("choose");
      } else if (ind > -1) {
        this.chooseDates.splice(ind, 1);
        parDom.classList.remove("choose");
      }
      //排序
      this.chooseDates.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime();
      });
      this.chooseCallBack(this.chooseDates);
    }
  }
};
</script>

<style lang="scss" scoped>
.signCalendar {
  color: #fff;
  font-size: 0.26rem;
  text-align: center;
  background-color: #1c7ce5;
  padding-bottom: 0.16rem;
  .top-bar {
    font-size: 0.32rem;
    height: 0.88rem;
    line-height: 0.88rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
  .week {
    display: flex;
    align-items: center;
    height: 0.96rem;
    line-height: 0.96rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 0.15rem;
    span {
      flex: 1;
    }
  }
  .content {
    position: relative;
    overflow: hidden;
    transition: height 0.4s ease;
    .days {
      transition: top 0.3s;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      span {
        position: relative;
        display: block;
        height: 40px;
        line-height: 40px;
        width: calc(100% / 7);
        em {
          font-style: normal;
          display: inline-block;
          vertical-align: middle;
          width: 0.45rem;
          height: 0.45rem;
          line-height: 0.45rem;
          overflow: hidden;
          border-radius: 99em;
        }
        i {
          font-style: normal;
          display: none;
          width: 0.2rem;
          height: 0.2rem;
          background: url("../../assets/img/ico-hook.png");
          background-size: 100% 100%;
          position: absolute;
          right: 0.22rem;
          bottom: 0.1rem;
        }
        b {
          font-size: 0.24rem;
          font-weight: normal;
          position: absolute;
          right: 0.05rem;
          top: -0.2rem;
        }
      }
      .choose {
        em {
          background-color: #9fcdff;
          color: #0157d8;
        }
      }
      .signed {
        em {
          background-color: rgba(0, 0, 0, 0.1);
        }
        i {
          display: block;
        }
      }
      .today {
        em {
          background-color: #fff;
          color: #0157d8;
        }
      }
      .nolm {
        em {
          color: #fff;
          opacity: 0.3;
        }
      }
    }
  }
  .hide {
    height: 40px !important;
  }
}
.selectOne {
  position: relative;
}
.festival {
  color: #FFDFDD;
  display: inline-block !important;
  width: 100% !important;
  position: relative !important;
  top: -53px;
  left: 0px;
  height: 10px !important;
}
</style>
