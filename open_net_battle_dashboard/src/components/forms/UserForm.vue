<template>
    <!-- signup form -->
    <b-form @submit.prevent="handleSubmit">
        <b-form-group label-for="form-name" label-cols-lg="2">
            <b-input-group>
                <b-input-group-prepend is-text>
                <b-icon icon="person-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Username" id="form-name" :disabled="isBusy" v-model="userProxy.username"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group label-for="form-password" label-cols-lg="2" v-if="password">
            <b-input-group v-if="password">
                <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Password" id="form-password" type="password" :disabled="isBusy" v-model="userProxy.password"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group label-for="form-confirm-password" label-cols-lg="2" v-if="password">
            <b-input-group v-if="password">
                <b-input-group-prepend is-text>
                <b-icon icon="lock-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Re-enter password" id="form-confirm-password" type="password" :disabled="isBusy" v-model="confirmPassword"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group label-for="form-mail" label-cols-lg="2">
            <b-input-group>
                <b-input-group-prepend is-text>
                <b-icon icon="envelope-fill"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Email" id="form-email" type="email" :disabled="isBusy" v-model="userProxy.email"></b-form-input>
            </b-input-group>
        </b-form-group>
        <b-form-group label-for="form-twitter" label-cols-lg="2">
            <b-input-group>
                <b-input-group-prepend is-text>
                <b-icon icon="at"></b-icon>
                </b-input-group-prepend>
                <b-form-input placeholder="Twitter" id="form-twitter" :disabled="isBusy" v-model="userProxy.twitter"></b-form-input>
            </b-input-group>
        </b-form-group>
        <div class="d-flex justify-content-center">
            <b-button class="submit" ref="submit" type="submit" :disabled="isBusy">Submit</b-button>
        </div>
    </b-form>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            default: () => {}
        },
        showLabels: {
            type: Boolean,
            default: false
        },
        password: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            userProxy: { username: "", password: "", email: "", twitter: ""},
            confirmPassword: "",
            isBusy: false
        }
    },
    watch: {
        user: function() {
            this.userProxy = this.user;
        }
    },
    methods: {
        busy(state) {
            if(state) {
                this.isBusy = state;
            } else {
                this.isBusy = true;
            }
        },
        handleSubmit() {    
            this.$emit('on-submit', this.userProxy, this.password? this.confirmPassword : null);
        }
    },
    mounted() {
        if(this.showLabels) return;

        let nodes = document.querySelectorAll("label");

        nodes.forEach(node => {
            node.style.display = 'none';
        })
    }
}
</script>