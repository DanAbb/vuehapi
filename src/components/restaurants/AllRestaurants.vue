<template>
  <div class="all-restaurants-wrapper" >
    <h1 class="page-title">Your Restaurants</h1>
    <div class="restaurants" v-if="!loading">
      <restaurant-card
        v-for="restaurant in restaurants" :key="restaurant._id"
        :restaurant="restaurant">
      </restaurant-card>
    </div>
  </div>
</template>

<script>
import { api } from 'services/api'
import { mapGetters } from 'vuex'
import restaurantCard from './RestaurantCard'

export default {
  async created () {
    this.loading = true
    const restaurants = await api('get', 'Restaurants')
    this.$store.commit('update_restaurants', restaurants.data)
    this.loading = false
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters([
      'restaurants'
    ])
  },
  methods: {
  },
  components: {
    restaurantCard
  }
}
</script>

<style lang="scss" scoped>
  @import '~styles/global.scss';

  .restaurants {
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>
