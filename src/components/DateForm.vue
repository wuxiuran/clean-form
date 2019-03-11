<template>
  <div class="form-container">
    <h3>{{`${timeObj.year}年${timeObj.month}月值日表`}}</h3>
    <ul class="week-list clearfix">
      <li :key="index" v-for="(item, index) in weekDay">
        <div>{{item}}</div>
      </li>
    </ul>
    <ul class="clearfix">
      <li :class="{
        'not-current': item.type !== 'current',
        'is-today': item.isToday
      }" :key="index" v-for="(item, index) in dataList">
        <div class="date-title">
          {{item.isToday ? '今天' : item.date}}
        </div>
        <div :key="key" class="works" v-for="(obj, key) in item.works">
          {{`${obj.name}:${obj.who}`}}
        </div>
      </li>
    </ul>
    <div class="btn-box">
      <div class="btn-primary" @click="prev">上个月</div>
      <div class="btn-primary" @click="next">下个月</div>
    </div>
  </div>
</template>

<script>
import dataForm from '../assets/js/date'
import rules from '../assets/js/config'
const oDate = new dataForm(rules)
export default {
  name: 'DateForm',
  props: {
    msg: String,
  },
  methods: {
    next () {
      this.dateObj.nextMonth()
    },
    prev () {
      this.dateObj.prevMonth()
    }
  },
  data () {
    return {
      dateObj: oDate,
      dataList: oDate.init(),
      timeObj: oDate.timeObj,
      weekDay: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .form-container {
    width: 714px;
    h3 {
      font-size: 24px;
      line-height: 32px;
      text-align: center;
      font-weight: bold;
      margin: 20px 0;
    }
    ul {
      .not-current {
        color: #999999;
        border-color: #999999;
        opacity: .6;
      }
      li {
        box-sizing: border-box;
        padding: 6px;
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border: 1px solid #000;
        margin: 1px;
        float: left;
        cursor: pointer;
      }
      li:nth-child(7n - 1),li:nth-child(7n) {
        color: #fb7299;
      }
      .is-today {
        color: #00a1d6;
        border: 1px solid #00a1d6;
      }
      .date-title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 4px;
      }
      .works {
        line-height: 14px;
        font-size: 12px;
        margin-bottom: 2px;
      }
    }
    .week-list {
      li {
        border: none;
        padding: 10px 0px;
        text-align: center;
        height: 40px;
        div {
          height: 20px;
          line-height: 20px;
          font-size: 18px;
        }
      }
    }
    .btn-box {
      margin: 30px 0;
      text-align: center;
      div {
        margin-right: 20px;
      }
      div:last-child {
        margin-right: 0px;
      }
    }
  }
</style>
