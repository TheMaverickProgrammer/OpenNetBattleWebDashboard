<template>
  <div class="login-reg-panel">
      <!-- login question toggle -->
      <div class="login-info-box" v-if="!showLoginForm">
        <h2>I already have an account</h2>
        <b-button id="label-register" for="log-reg-show" @click="onToggleForm">Login</b-button>
      </div>

      <!-- signup question toggle -->
      <div class="register-info-box" v-if="showLoginForm">
        <h2>Don't have an account?</h2>
        <b-button id="label-login" for="log-login-show" @click="onToggleForm">Signup</b-button>
      </div>

      <div :class="{ 'white-panel': true, 'right-log': !showLoginForm}">
        <!-- login form -->
        <b-form :class="{ 'login-show': true, 'show-log-panel': showLoginForm}" @submit.prevent="onSubmit">
          <h2>Login</h2>
          <b-form-group label-for="form-name" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Username" id="form-name" :disabled="busy" v-model="username"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="form-password" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Password" id="form-password" type="password" :disabled="busy" v-model="password"></b-form-input>
            </b-input-group>
          </b-form-group>
          <div class="d-flex justify-content-center">
            <b-button class="submit" ref="submit" type="submit" :disabled="busy">Submit</b-button>
          </div>
        </b-form>
        <!-- signup form -->
        <b-form :class="{ 'register-show': true, 'show-log-panel': !showLoginForm}" @submit.prevent="onSubmit">
          <h2>Create Account</h2>
          <b-form-group label-for="form-name" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Username" id="form-name" :disabled="busy"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="form-password" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Password" id="form-password" type="password" :disabled="busy"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="form-confirm-password" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Re-enter password" id="form-confirm-password" type="password" :disabled="busy"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="form-mail" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Email" id="form-email" type="email" :disabled="busy"></b-form-input>
            </b-input-group>
          </b-form-group>
          <b-form-group label-for="form-twitter" label-cols-lg="2">
            <b-input-group>
              <b-input-group-prepend is-text>
                <b-icon icon="at"></b-icon>
              </b-input-group-prepend>
              <b-form-input placeholder="Twitter" id="form-twitter" :disabled="busy"></b-form-input>
            </b-input-group>
          </b-form-group>
          <div class="d-flex justify-content-center">
            <b-button class="submit" ref="submit" type="submit" :disabled="busy">Submit</b-button>
          </div>
        </b-form>

        <!-- busy overlay -->
        <b-overlay :show="busy" no-wrap>
          <template v-slot:overlay>
            <div v-if="processing" class="text-center p-4 text-light bg-info">
              <b-icon icon="cloud-upload" font-scale="4"></b-icon>
              <div class="mb-3">Processing...</div>
              <b-progress
                min="1"
                max="20"
                :value="counter"
                variant="warning"
                height="3px"
                class="mx-n4 rounded-0"
              ></b-progress>
            </div>
            <div
              v-else
              ref="dialog"
              tabindex="-1"
              role="dialog"
              aria-modal="false"
              aria-labelledby="form-confirm-label"
              class="text-center p-3"
            >
            </div>
          </template>
        </b-overlay>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            busy: false,
            processing: false,
            counter: 1,
            interval: null,
            username: "",
            password: "",
            showLoginForm: true
        }
    },
    beforeDestroy() {
        this.clearInterval()
    },
    methods: {
        onToggleForm(e) {
            e.preventDefault();

            if(this.busy) return;

            this.showLoginForm = !this.showLoginForm;
        },
        clearInterval() {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = null
            }
        },
        autoLogin() {
          this.onSubmit(null, true);
        },
        onSubmit(evt, autoLogin) {
            this.busy = true;
            this.counter = 1;
            this.processing = true;

            let self = this;

            // Simulate an async request
            axios.get('http://battlenetwork.io:3000/v1/login', 
                {
                    cancelToken: new axios.CancelToken(function executor(c) {
                        self.cancelRequest = c;
                    }),
                    withCredentials: true, 
                    auth: { username: this.username, password: this.password },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }, 
            )
            .then(response => {
                this.$store.dispatch('loginUser', response.data.user);


                let alert = {};
                
                if(autoLogin) {
                  alert = { message: "Welcome back, " + response.data.user.username + "!", type: "success", title: "Autologin" };
                } else {
                  alert = { message: "Welcome to cyberworld, " + response.data.user.username + "!", type: "success" };
                }

                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            }).catch(err => {
                if(!autoLogin) {
                  let alert = { message: err, type: "danger", title: "Internal Error" };
                  this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                }

                // let auto login fail silently
            }).finally(() => {
                this.clearInterval();
                this.busy = this.processing = false;
            });

            this.clearInterval()
            this.interval = setInterval(() => {
                if (this.counter < 20) {
                    this.counter = this.counter + 1
                } else {
                    this.clearInterval()
                    this.$nextTick(() => {
                        this.busy = this.processing = false;
                        this.cancelRequest("Login timeout");
                    })
                }
            }, 350)
        },
        cancelLoginAction() {
            this.$emit('cancel-action');
        }
    }
}
</script>

<style scoped>
a{
  text-decoration:none;
  color:#444444;
}

#label-login:hover, #label-register:hover {
  background-color:aquamarine;
  color: black;
  border-color: black;
  border-style:none !important;
}

#label-login, #label-register {
  border-style:none !important;
  background-color: black;
  color: inherit;
}

.login-reg-panel{
  position: relative;
  top: 50%;
  transform: translateY(-50%);
	text-align:center;
  width:70%;
	right:0;left:0;
  margin:auto;
  height:400px;
  background-color: rgba(29, 33, 36, 0.9);
}
.white-panel{
  background-color: rgba(255,255, 255, 1);
  height:fit-content;
  position:absolute;
  top:-50px;
  width:50%;
  right:calc(50% - 50px);
  transition:.3s ease-in-out;
  z-index:0;
  box-shadow: 0 0 15px 9px #00000013;
}
.login-reg-panel input[type="radio"]{
  position:relative;
  display:none;
}
.login-reg-panel{
  color:#B8B8B8;
}
.login-reg-panel #label-login, 
.login-reg-panel #label-register{
  border:1px solid #9E9E9E;
  padding:5px 5px;
  width:150px;
  display:block;
  text-align:center;
  border-radius:10px;
  cursor:pointer;
  font-weight: 600;
  font-size: 18px;
}
.login-info-box{
  width:30%;
  padding:0 50px;
  top:20%;
  left:0;
  position:absolute;
  text-align:left;
}
.register-info-box{
  width:30%;
  padding:0 50px;
  top:20%;
  right:0;
  position:absolute;
  text-align:left;  
}

.right-log{right:50px !important;}
.login-show, 
.register-show{
  z-index: 1;
  display:none;
  opacity:0;
  transition:0.3s ease-in-out;
  color:#242424;
  text-align:left;
  padding:50px;
}
.show-log-panel{
  display:block;
  opacity:0.9;
}
.login-show input[type="text"], .login-show input[type="password"]{
  width: 100%;
  display: block;
  padding: 15px;
  border: 1px solid #b5b5b5;
  outline: none;
}
.login-show input[type="button"] {
  max-width: 150px;
  width: 100%;
  background: #444444;
  color: #f9f9f9;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 2px;
  float:right;
  cursor:pointer;
}
.login-show a{
  display:inline-block;
  padding:10px 0;
}

.register-show input[type="text"], .register-show input[type="password"]{
  width: 100%;
  display: block;
  padding: 15px;
  border: 1px solid #b5b5b5;
  outline: none;
}
.register-show input[type="button"] {
  max-width: 150px;
  width: 100%;
  background: #444444;
  color: #f9f9f9;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 2px;
  float:right;
  cursor:pointer;
}
.credit {
  position:absolute;
  bottom:10px;
  left:10px;
  color: #3B3B25;
  margin: 0;
  padding: 0;
  font-family: Arial,sans-serif;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 1px;
  z-index: 99;
}
.submit:hover {
  color: white;
}

.submit {
  color : black;
  background-color: white;
}
</style>