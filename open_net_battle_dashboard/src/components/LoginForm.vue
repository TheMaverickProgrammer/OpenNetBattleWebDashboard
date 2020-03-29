<template>
  <div>
    <b-form class="position-relative p-3" @submit.prevent="onSubmit">
      <b-form-group label="Name" label-for="form-name" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input id="form-name" :disabled="busy" v-model="username"></b-form-input>
        </b-input-group>
      </b-form-group>
      <b-form-group label="Password" label-for="form-password" label-cols-lg="2">
        <b-input-group>
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input id="form-password" type="password" :disabled="busy" v-model="password"></b-form-input>
        </b-input-group>
      </b-form-group>
      <div class="d-flex justify-content-center">
         <b-button ref="submit" type="submit" :disabled="busy">Submit</b-button>
         <b-button ref="cancel" :disabled="busy" @click="cancelLoginAction">Go Back</b-button>
      </div>

      <b-overlay :show="busy" no-wrap>
        <template v-slot:overlay>
          <div v-if="processing" class="text-center p-4 bg-primary text-light rounded">
            <b-icon icon="cloud-upload" font-scale="4"></b-icon>
            <div class="mb-3">Processing...</div>
            <b-progress
              min="1"
              max="20"
              :value="counter"
              variant="success"
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
    </b-form>
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
            password: ""
        }
    },
    beforeDestroy() {
        this.clearInterval()
    },
    methods: {
        clearInterval() {
            if (this.interval) {
                clearInterval(this.interval)
                this.interval = null
            }
        },
        onSubmit() {
            this.busy = true;
            this.counter = 1;
            this.processing = true;

            // Simulate an async request
            axios.get('http://battlenetwork.io:3000/v1/login', 
                {
                    useCredentials: true, 
                    auth: { username: this.username, password: this.password },
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                }, 
            )
            .then(response => {
                this.$store.dispatch('setUser', response.data.user);
            }).catch(err => {
                console.log("error: " + err);
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