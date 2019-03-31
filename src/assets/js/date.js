export default class dateForm {
  constructor (options) {
    this.time = new Date()
    this.options = options
    this.otherDate = new Date()
    this.initTime()
    this.otherDate.setDate(1)
    this.otherDate.setMonth(this.timeObj.month)
    this.otherDate.setDate(0)
    this.totalDay = this.otherDate.getDate()
    this.dateList = []
  }
  dateIndexInYear = (month, day) => {
    const nowDate = new Date()
    nowDate.setDate(1)
    nowDate.setMonth(month)
    nowDate.setDate(day)
    const initTime = new Date()
    initTime.setDate(1)
    initTime.setMonth(0) // 本年初始月份
    initTime.setDate(1) // 本年初始时间
    var differenceVal = nowDate - initTime ; // 今天的时间减去本年开始时间，获得相差的时间
    return Math.ceil(differenceVal/(24*60*60*1000));
  }
  unshiftPrev = () => {
    let n = 0
    this.dateList[0].week === 0 ?  n = 7 : n = this.dateList[0].week
    const oDate = new Date()
    oDate.setMonth(this.timeObj.month - 1)
    oDate.setDate(0)
    let nDate = oDate.getDate()
    for (let i = n; i > 1; i--) {
      const data = {
        week: i - 1,
        date: nDate--,
        type: 'prev',
        month: this.timeObj.month - 1,
        isToday: false
      }
      data.works = this.mathWho(data.month - 1, data.date)
      this.dateList.unshift(data)
    }
  }
  mathWho = (month, day) => {
    const iNow = this.dateIndexInYear(month, day)
    const result = []
    this.options.work.forEach((item) => {
      const space = item.space
      const length = item.peopleGroup.length
      const n = length * space
      const Remainder = iNow % n
      let params = {
        name: item.name,
        who: item.none
      }
      if (space === 1) {
        if (Remainder === 0) {
          params = {
            name: item.name,
            who: item.peopleGroup[length - 1]
          }
        } else {
          params = {
            name: item.name,
            who: item.peopleGroup[Remainder - 1]
          }
        }
      } else {
        const nP = Remainder % space
        if (nP != 0) {
          if (nP === 1) {
            params = {
              name: item.name,
              who: item.peopleGroup[Math.floor(Remainder / space)]
            }
          }
        }
      }
      result.push(params)
    })
    return result
  }
  pushNext = () => {
    let n = 0
    this.dateList[this.dateList.length - 1].week === 0 ?  n = 7 : n = this.dateList[this.dateList.length - 1].week
    let nDate = 1
    for (let i = n; i < 7; i++) {
      const data = {
        week: i + 1,
        date: nDate++,
        type: 'next',
        month: this.timeObj.month + 1,
        isToday: false
      }
      data.works = this.mathWho(data.month - 1, data.date)
      this.dateList.push(data)
    }
  }
  init = () => {
    this.otherDate.setDate(1)
    this.dateList.length = 0
    const newDate = new Date()
    for (let i = 0; i < this.totalDay; i ++) {
      this.otherDate.setDate(i + 1)
      const data = {
        week: this.otherDate.getDay(),
        date: i + 1,
        type: 'current',
        month: this.timeObj.month,
        isToday: (newDate.getDate() === (i + 1) && (newDate.getMonth() + 1) === this.timeObj.month)
      }
      data.works = this.mathWho(data.month - 1, data.date)
      this.dateList.push(data)
    }
    this.unshiftPrev()
    this.pushNext()
    return this.dateList
  }
  initTime () {
    this.timeObj = {
      date: this.otherDate.getDate(),
      month: this.otherDate.getMonth() + 1,
      year: this.otherDate.getFullYear()
    }
  }
  setTime () {
    this.timeObj.date = this.otherDate.getDate()
    this.timeObj.month = this.otherDate.getMonth() + 1
    this.timeObj.year = this.otherDate.getFullYear()
  }
  nextMonth () {
    this.otherDate.setDate(1)
    this.otherDate.setMonth(this.timeObj.month)
    this.setTime()
    this.init()
  }
  prevMonth () {
    this.otherDate.setDate(1)
    this.otherDate.setMonth(this.timeObj.month - 2)
    this.setTime()
    this.init()
  }
}
