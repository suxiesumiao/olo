<template>
  <div class="licences" :class="{appear: isappear}">
    <header @click="disappear()">
      <h3>{{ licencename }}</h3>
    </header>
    <img :src="src">
  </div>
</template>
<script>
export default {
  data: function () {
    return {
    }
  },
  props: {
    src: '',
    isappear: false,
    licencename: {
      default: function () {
        return '执照'
      }
    }
  },
  mounted: function () {
  },
  methods: {
    disappear: function () {
      this.$emit('disappear')
    }
  }
}
</script>
<style scoped>
.licences{
  position: absolute;
  background-color: #fff;
  right: -100%;
  top: 0;
  width: 100%;
  height: 100vh;
  transition: all .3s;
}
.appear{
  right: 0;
}
header{
  background-color: #2196f3;
  background-position: left;
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-image: url('../../shop/images/arrow.svg');
}
header>h3{
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  padding: .5rem 0;
}
</style>
