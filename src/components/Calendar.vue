<template>
  <div class="calendar-wrapper">
    <div class="header">
      <div class="backward" @click.prevent="buildCalendar('backward')">
        <img :src="img.leftArrow" alt="arrow">
      </div>
      <div class="forward" @click.prevent="buildCalendar('forward')">
        <img :src="img.rightArrow" alt="arrow">
      </div>
      <h1>{{ formattedMonth }}</h1>
    </div>
    <div class="weekday">
      <div class="weekday-cell" v-for="day in days" :key="day">
        {{ day }}
      </div>
    </div>
    <div class="calendar">
      <div class="calendar-row" v-for="x in 6" :key="x">
        <div class="calendar-cell" v-for="x in 7" :key="x" @click.self="goToDate($event)">
          <p class="date"></p>
          <div class="bookings"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import leftArrow from 'img/left-arrow.png'
import rightArrow from 'img/right-arrow.png'

export default {
  created () {
  },
  mounted () {
    this.buildCalendar()
  },
  data () {
    return {
      img: {
        leftArrow,
        rightArrow
      },
      days: [
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
        'Sun'
      ],
      month: moment(),
      formattedMonth: moment().format('MMMM YYYY')
    }
  },
  computed: {
  },
  methods: {
    buildCalendar (go = '') {
      const month = go === 'forward'
        ? this.getNextMonth()
        : go === 'backward'
          ? this.getPreviousMonth()
          : this.month.get('month')

      const daysInMonth = this.getDaysInMonth(month)
      const monthStartDay = this.getMonthStartDay(month)

      const cells = this.$el.querySelectorAll('.calendar-cell')
      let count = 1

      for (const cell of cells) {
        cell.classList.remove('disabled')
        cell.classList.remove('today')
        cell.querySelector('.date').innerHTML = ''
        cell.setAttribute('data-date', '')
      }

      for (const cell of cells) {
        if (count < monthStartDay || count >= (daysInMonth + monthStartDay)) {
          cell.classList.add('disabled')
        } else if ((count - monthStartDay + 1) === moment().get('date') && this.month.get('month') === moment().get('month')) {
          cell.querySelector('.date').innerHTML = count - monthStartDay + 1
          const today = moment().year(this.month.get('year')).month(this.month.get('month')).date(count - monthStartDay + 1)
          cell.setAttribute('data-date', today.format('DD/MM/YYYY'))
          cell.classList.add('today')
        } else {
          cell.querySelector('.date').innerHTML = count - monthStartDay + 1
          const today = moment().year(this.month.get('year')).month(this.month.get('month')).date(count - monthStartDay + 1)
          cell.setAttribute('data-date', today.format('DD/MM/YYYY'))
        }
        count++
      }

      this.formattedMonth = this.month.format('MMMM YYYY')
    },
    getDaysInMonth (month) {
      return moment().month(month).daysInMonth()
    },
    getMonthStartDay (month) {
      return moment().month(month).startOf('month').get('isoWeekday')
    },
    getNextMonth () {
      const month = this.month.add(1, 'months')
      this.month = month
      return month.get('month')
    },
    getPreviousMonth () {
      this.month = this.month.subtract(1, 'months')
      return this.month.get('month')
    },
    goToDate (ev) {
      if (ev.target.classList.contains('disabled')) return
      const date = ev.target.getAttribute('data-date')
      const dateArr = date.split('/')
      this.$router.push({
        name: 'EventDate',
        params: {
          day: dateArr[0],
          month: dateArr[1],
          year: dateArr[2]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .calendar-wrapper {
    margin: -50px -50px -50px;
  }

  .weekday {
    display: flex;
    border-top: 1px solid $grey;
    padding: 5px 0 0;
    background: #fff;
  }

  .weekday-cell {
    width: 150px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  .calendar {
    border: 1px solid $grey;
  }

  .calendar-row {
    display: flex;
    border-bottom: 1px solid $grey;

    &:last-child {
      border-bottom: none;
    }
  }

  .calendar-cell {
    height: 120px;
    width: 150px;
    background: #fff;
    box-sizing: border-box;
    cursor: pointer;
    border-right: 1px solid $grey;
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);

    &:last-child {
      border-right: none;
    }

    &:hover {
      background: lighten($color: $grey, $amount: 15%);
    }

    &.disabled {
      background: lighten($color: $lightest, $amount: 7%);
      cursor: inherit;

      &:hover {
      }
    }

    &.today {
      .date {
        background: $secondary;
        width: auto;
        color: #fff;
      }
    }

    .date {
      padding: 5px;
      position: absolute;
      border-radius: 50px;
      margin: 2px;
    }
  }

  .header {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    box-sizing: border-box;

    h1 {
      margin-left: 40px;
    }

    .backward,
    .forward {
      cursor: pointer;
      margin: auto 20px;
      user-select: none;

      img {
        height: 50px;
        transition: all 0.3s cubic-bezier(.25,.8,.25,1);

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
</style>
