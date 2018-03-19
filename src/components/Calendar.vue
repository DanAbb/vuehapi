<template>
  <div class="calendar-wrapper">
    <div class="pagination">
      <div class="backward" @click.prevent="buildCalendar('backward')">
        <h1>Back</h1>
      </div>
      <div class="forward" @click.prevent="buildCalendar('forward')">
        <h1>Forward</h1>
      </div>
    </div>
    <div class="header">
      <h1>{{ formattedMonth }}</h1>
    </div>
    <div class="weekday">
      <div class="weekday-cell" v-for="day in days" :key="day">
        {{ day }}
      </div>
    </div>
    <div class="calendar">
      <div class="calendar-row" v-for="x in 6" :key="x">
        <div class="calendar-cell" v-for="x in 7" :key="x">
          <p class="date"></p>
          <div class="bookings"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  created () {
  },
  mounted () {
    this.buildCalendar()
  },
  data () {
    return {
      days: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
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
      }

      for (const cell of cells) {
        if (count < monthStartDay) {
          cell.classList.add('disabled')
        } else if (count >= (daysInMonth + monthStartDay)) {
          cell.classList.add('disabled')
        } else if ((count - monthStartDay + 1) === moment().get('date') && this.month.get('month') === moment().get('month')) {
          cell.querySelector('.date').innerHTML = count - monthStartDay + 1
          cell.classList.add('today')
        } else {
          cell.querySelector('.date').innerHTML = count - monthStartDay + 1
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .calendar-wrapper {
  }

  .weekday {
    display: flex;
  }

  .weekday-cell {
    width: 150px;
    margin-bottom: 5px;
  }

  .calendar {
    border: 1px solid $grey;
  }

  .calendar-row {
    display: flex;
  }

  .calendar-cell {
    height: 100px;
    width: 150px;
    border: 1px solid $grey;
    background: #fff;
    box-sizing: border-box;

    &.disabled {
      background: $lightest;
    }

    &.today {
      border: 2px solid $secondary;
    }

    .date {
      padding: 2px;
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      cursor: pointer;
      margin: auto 20px;
      user-select: none;
    }
  }

  .header {
    margin-bottom: 20px;
  }
</style>
