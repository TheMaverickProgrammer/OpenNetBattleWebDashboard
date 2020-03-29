<template>
  <div id="app">
    <div id="app-content">
      <div v-if="$store.state.user.username != ''">
        <Navbar :user="$store.state.user.username"/>
        <div> 
          <router-view/>
        </div>
      </div>
      <div v-else>
        <Landing/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Landing from '@/components/Landing';

export default {
  name: 'App',
  components: {
    Navbar,
    Landing
  },
  methods: {
    makeAlert(message, type) {
      const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
      this.$bvToast.toast(String(message), {
        title: capitalized,
        autoHideDelay: 5000,
        variant: type,
        appendToast: false
      });
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribeAction((action) => {
      if (action.type === 'alerts/addAlert') {
        let alert = action.payload;
        this.makeAlert(alert.message, alert.type);
      }
    });
  },
  beforeDestroy() {
    this.unsubscribe();
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgba(0,0,0,0.1);
}

#app-content {
  margin-left: 5%;
  margin-right: 5%;
  background-color:white;
  height: 100vh;
}
</style>
