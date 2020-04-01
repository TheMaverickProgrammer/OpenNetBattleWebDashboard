<template>
    <div class="app-background">
        <b-button v-b-toggle.collapse-1 variant="info" class="command-panel"><b-icon-arrow90deg-down/>Command Panel</b-button>
        <b-collapse id="collapse-1" class="mt-2">
            <div v-if="$store.state.user.isAdmin || true">
                <p class="card-text">Admin commands</p>
                <b-card-group>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-card-text/>Card
                        </template>
                        <b-button-group vertical>
                            <b-button variant="success" @click="handleCreateCard">Create</b-button>
                            <b-button variant="warning">Edit</b-button>
                            <b-button variant="danger">Delete</b-button>
                        </b-button-group>
                    </b-card>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-person/>User
                        </template>
                        <b-button-group vertical>
                            <b-button variant="warning">Edit</b-button>
                            <b-button variant="danger">Delete</b-button>
                        </b-button-group>
                    </b-card>
                    <b-card>
                        <template v-slot:header>
                            <b-icon-star/>Admin
                        </template>
                        <b-button-group vertical>
                            <b-button variant="success">Promote</b-button>
                            <b-button variant="danger">Demote</b-button>
                        </b-button-group>
                    </b-card>
                </b-card-group>
                <!-- the dynamic form based on selection above -->
                <b-collapse id="collapse-2" class="mt-2" v-model="showProxy">
                    <component :is="formType"/>
                </b-collapse>
            </div>
        </b-collapse>
    </div>
</template>

<script>
import CardForm from '@/components/forms/CardForm'

export default {
    components: {
        CardForm
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        formType: {
            type: String,
            default: "CardForm"
        }
    },
    data() {
        return {
            showProxy: this.show
        }
    },
    methods: {
        handleCreateCard() {
            this.formType = "CardForm";
            this.showProxy = true;
        }
    }
}
</script>

<style scoped>
.command-panel {
    margin: 10px;
}
</style>