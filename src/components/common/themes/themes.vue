<template>
  <div class="themes-container">
    <div class="themes">
      <router-link class="theme"
          v-for="theme in themes"
          :title="theme.description"
          :to="routerTo(theme.id, theme.title, Geo)"
          :key="theme.id">
        <figure>
          <img class="themeImage"
                :src="Tool.getThemeImage(theme.image_url)"
                :alt="theme.description">
        </figure>
        <figcaption>
          <h6 v-cloak
              class="theme-title">{{ theme.title }}</h6>
        </figcaption>
      </router-link>
    </div>
  </div>
</template>
<script>
import Tool from '../js/Tool'
export default {
  data: function () {
    return {
      Tool: Tool
    }
  },
  props: {
    themes: {
      default: function () {
        return []
      }
    },
    Geo: {
      default: function () {
        return {}
      }
    }
  },
  components: {
    Tool
  },
  mounted: function () {
  },
  methods: {
    routerTo: function (id, title, obj) {
      return `/Theme#id=${id}#title[${title}]#geo=${obj.latitude}=${obj.longitude}`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
* {
  box-sizing: border-box;
  margin: 0;
}

html {
  font-size: 40px;
  user-select: none;
}
main {
  position: relative;
  width: 100%;
}

.themes-container {
  background-color: #fff;
  width: 100%;
  overflow-x: scroll;
  margin-bottom: 1rem;
}

.themes {
  width: 200%;
}

.theme {
  display: inline-block;
  padding: .5rem 0;
  width: 12.5%;
  text-decoration-line: none;
}

.themeImage {
  display: block;
  margin: 0 auto;
  width: 4rem;
}

.theme-title {
  text-align: center;
  font-size: .75rem;
  color: #666;
}
</style>
