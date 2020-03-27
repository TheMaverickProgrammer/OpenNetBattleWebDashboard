<template>
  <div id="app">
    <div id="app-content">
    <Navbar user="JamesKing"/>
    <div> 
      <router-view/>
    </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar,
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
