<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link>
    <div v-if="userName">Hello {{ userName }}</div>
    <div v-else>Please login</div>
  </div>
  <router-view />
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      userName: "getUserName",
    }),
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
