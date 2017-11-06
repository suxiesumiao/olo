<template>
  <div class="star"
       :class="computeStar(number)">
    <img src="./images/star.png">
  </div>
</template>
<script>
export default {
  props: {
    number: {
      default: 0.5
    }
  },
  methods: {
    computeStar: function (num) {
      return 'star-s-' + ((Math.ceil(num) - 0.5) * 2)
    }
  }
}
</script>
<style lang="css">
@import './star.css';
</style>
