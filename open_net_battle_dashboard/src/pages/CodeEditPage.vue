<template>
    <div class="content">
        <PrismEditor language="ts" v-model="source" :code="source" lineNumbers/>
        <b-card>
            <b-button variant="warning"><b-icon-cloud-upload/>Save</b-button>
        </b-card>
    </div>
</template>

<script>
import "prismjs";
import "prismjs/components/prism-typescript.js"
import "prismjs/plugins/match-braces/prism-match-braces.js"
import "prismjs/plugins/match-braces/prism-match-braces.css"
import "prismjs/plugins/show-invisibles/prism-show-invisibles.js"
import "prismjs/plugins/show-invisibles/prism-show-invisibles.css"
import "prismjs/plugins/toolbar/prism-toolbar.js"
import "prismjs/plugins/toolbar/prism-toolbar.css"
import "prismjs/plugins/download-button/prism-download-button.js"
import "prismjs/themes/prism-okaidia.css";
import PrismEditor from "vue-prism-editor";
import "vue-prism-editor/dist/VuePrismEditor.css";

export default {
    name: "CodeEditPage",
    components: { 
        PrismEditor
    },
    data() {
        return {
            source: "/*\nONB can be scripted in Typescript\nhttps://www.tutorialspoint.com/typescript/index.htm\nStart typing!\n*/"
        }
    }
}
</script>

<style scoped>
.content {
    background-color:white;
}
div.prism-editor-wrapper {
    min-height: 400px;
    max-height: 500px;
    overflow-y: auto;
}
</style>