<template>
  <div id="app">
    <div v-if="$store.state.user.username != ''">
      <div id="app-content"> 
        <Navbar :user="$store.state.user.username"/>
        <router-view/>
      </div>
    </div>
    <div v-else>
      <Landing ref="landingPage"/>
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
  props: {
  },
  methods: {
    makeAlert(message, type, title) {
      this.$bvToast.toast(String(message), {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        autoHideDelay: 5000,
        variant: type,
        appendToast: false
      });
    }
  },
  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'alerts/doAddAlert') {
        let alert = mutation.payload;
        this.makeAlert(alert.message, alert.type, alert.title);
      }
    });
  },
  mounted() {
    // try auto-logging in
    this.$refs.landingPage.autoLogin();
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
  height:100vh;
	min-height:550px;
  position:relative;
  overflow-y:hidden;
	background-image: url(./assets/ow.gif);
	background-repeat: no-repeat;
	background-size:cover;
	background-position:center;
}

#app-content {
  margin-left: 15%;
  margin-right: 15%;
  height: 100vh;
}
.app-background {
  background-color:white;
}

.b-icon {
  padding-right: 3px;
}

/* 
Elements from spritesheet 
*/

span.element_icons {
  background-image: url('assets/elements.png');
  width: 14px;
  height: 14px;
  display: inline-block;
  transform: scale(2);

  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;          /* Firefox */
  image-rendering: -o-crisp-edges;            /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
  -ms-interpolation-mode: nearest-neighbor;   /* IE (non-standard property) */
}

span.element_icons.fire{background-position:0px 0px;}
span.element_icons.aqua{background-position:-14px 0px;}
span.element_icons.electric{background-position:-28px 0px;}
span.element_icons.wood{background-position:-42px 0px;}
span.element_icons.sword{background-position:-56px 0px;}
span.element_icons.wind{background-position:-70px 0px;}
span.element_icons.cursor{background-position:-84px 0px;}
span.element_icons.summon{background-position:-98px 0px;}
span.element_icons.plus{background-position:-112px 0px;}
span.element_icons.break{background-position:-126px 0px;}
span.element_icons.none{background-position:-140px 0px;}
</style>
