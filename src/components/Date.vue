<template>
  <div class="date-wrapper">
    <h1>{{ day }}/{{ month }}/{{ year }}</h1>

    <h1>TODO:</h1>
    <h4>- halt bookings for this day only</h4>
    <h4>- add new booking on this day</h4>
    <h4>- view bookings for this day</h4>
    <h4>- cancel bookings for this day</h4>
  </div>
</template>

<script>
export default {
  props: [
    'day',
    'month',
    'year'
  ]
}
</script>

<style lang="scss" scoped>
  .date-wrapper {
  }
</style>
