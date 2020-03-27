<template>
  <div id="app">
    <Navbar/>
    <div> 
      <FolderCardList :folders="folders"></FolderCardList>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import FolderCardList from './components/FolderCardList';

export default {
  name: 'App',
  components: {
    Navbar,
    FolderCardList
  },
  data() {
    return {
      folders: [
        { 
          id: 1,
          title: "TestFolder",
          count: 10,
          date: Date.now()
        },
        { 
          id: 2,
          title: "NoobFolder",
          count: 21,
          date: Date.now()

        },
        { 
          id: 3,
          title: "LanFlder",
          count: 15,
          date: Date.now()
        },
        { 
          id: 3,
          title: "LanFlder",
          count: 15,
          date: Date.now()
        }
      ]
    }
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
  margin-top: 60px;
}
</style>
