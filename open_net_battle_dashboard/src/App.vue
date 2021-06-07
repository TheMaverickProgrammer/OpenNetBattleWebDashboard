<template>
  <div id="app">
    <div v-if="$store.state.user.username != ''">
      <div id="app-content"> 
        <Navbar :user="$store.state.user.username" :monies="$store.state.user.monies"/>
        <transition name="fade" mode="out-in">    
          <keep-alive :include="keepAliveList">    
            <router-view/>
          </keep-alive>
        </transition>
      </div>
    </div>
    <div v-else>
      <Landing ref="landingPage"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';
import Landing from '@/pages/Landing';

export default {
  name: 'App',
  components: {
    Navbar,
    Landing
  },
  props: {
  },
  data() {
    return {
      keepAliveList: ['FolderListPage','PublicFolderListPage','CardLibraryViewPage', 'FolderAddFromLibraryPage', 'ComboListPage']
    }
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
	background-image: url(./assets/ow.gif);
	background-repeat: no-repeat;
	background-size:cover;
	background-position:center;
  overflow-y:hidden;
}

#app-content {
  margin-left: 15%;
  margin-right: 15%;
  height: 100vh;
  overflow-y:auto;
}

@media (max-width: 800px) {
  #app-content {
    margin-left: 0%;
    margin-right: 0%;
    height: scroll;
  }
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
  vertical-align: text-top;

  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;          /* Firefox */
  image-rendering: -o-crisp-edges;            /* Opera */
  image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
  -ms-interpolation-mode: nearest-neighbor;   /* IE (non-standard property) */
}

.pixel-perfect {
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

/** 
Card Classes/Ranks
 */
 .cardContainer {
  padding: 10% !important;
 }

 .icon {
   vertical-align: text-top;
 }
 
.card-inspect-icon {
   width: 14px !important; 
   height:14px !important;
   vertical-align: initial !important;
 }

.Standard {
  background-color: white !important;
  color: black !important;
}

.Mega {
  background-color: #ceffff !important;
  color: black !important;
}

.Giga {
  background-color: #fff1f3 !important;
  color: black !important;
}

.Dark {
  background-color: #775f8f !important;
  color: white !important;
}

.StandardText {
  color: black !important;
}

.MegaText {
  color: #03c5c5 !important;
}

.GigaText {
  color: #f45a70 !important;
}

.DarkText {
  color: #8000ff !important;
}
</style>
