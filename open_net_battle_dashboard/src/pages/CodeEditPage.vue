<template>
    <div class="content">
        <PrismEditor language="lua" code=""/>
        <b-card>
            <b-button variant="warning"><b-icon-cloud-upload/>Save</b-button>
        </b-card>
    </div>
</template>

<script>
import PrismEditor from 'vue-prism-editor'

export default {
    name: "CodeEditPage",
    components: { 
        PrismEditor
    },
    data() {
        return {
            source: {
                type: String,
                default: ""
            }
        }
    }
}
</script>

<style scoped>
.content {
    background-color:white;
}
.editor {
    min-height: 200px;
}
</style>