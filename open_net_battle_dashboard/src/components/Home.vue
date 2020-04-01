<template>
    <div class="app-background">
        <b-button v-b-toggle.collapse-1 variant="info" class="command-panel"><b-icon-arrow90deg-down/>Command Panel</b-button>
        <b-collapse id="collapse-1" class="mt-2">
            <b-card>
                <div v-if="$store.state.user.isAdmin || true">
                    <b-container>
                        <b-row>
                            <p class="card-text">Admin commands</p>
                        </b-row>
                        <b-row>
                            <b-button variant="success">Create Card</b-button>
                            <b-button variant="warning">Edit Card</b-button>
                            <b-button variant="danger">Delete Card</b-button>
                        </b-row>
                        <b-row>
                            <b-button variant="warning">Edit User</b-button>
                            <b-button variant="danger">Delete User</b-button>
                        </b-row>
                        <b-row>
                            <b-button variant="warning">Promote Admin</b-button>
                            <b-button variant="danger">Delete Admin</b-button>
                        </b-row>
                    </b-container>
                </div>
            </b-card>
        </b-collapse>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.command-panel {
    margin: 10px;
}
</style>