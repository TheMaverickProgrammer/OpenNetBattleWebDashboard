<template>
  <div id="app">
    <div id="app-content">
      <div v-if="isLoggedIn">
        <Navbar user="JamesKing"/>
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
  }
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
}
</style>
