<template>
    <b-modal centered hide-footer
        ref="card-view-modal"  size="sm" 
        header-bg-variant="dark"
        header-text-variant="light"
        @hide="handleHidden">
        <template v-slot:modal-title v-if="!!card">
            {{ card.name }}&nbsp;
            <b-badge id="card-id-badge" variant="light">
                <b-tooltip target="card-id-badge" variant="light">
                    <p class="cardId">{{ card.id }}</p>
                </b-tooltip>
                id
            </b-badge>
        </template>

        <b-container fluid v-if="!!card">
            <b-row>
                <img :src="card.image" width="112px" height="96px" class="image"/> 
            </b-row>
            <b-row class="data-row">
                <b-col cols="2" class="left-aligned">
                    <CodeBadge :cardId="card.id"/>
                </b-col>
                <b-col cols="2" class="left-aligned"> 
                    <Element :type="card.element"/>
                </b-col>
                <b-col cols="8" class="damage">
                    {{ (card.damage > 0)? card.damage : '-' }}
                </b-col>
            </b-row>
            <b-row>
                <b-textarea disabled :value="getCardDescription"/>
            </b-row>
        </b-container>
        <b-button class="mt-2" variant="outline-danger" block @click="hideModal">Close</b-button>
    </b-modal>
</template>

<script>
import Element from './Element'
import CodeBadge from './CodeBadge'

export default {
    components: {
        Element,
        CodeBadge
    },
    computed: {
        getCardDescription() {
            if(this.card) {
                let vdesc = this.card.verboseDescription;
                if(vdesc && vdesc.length)
                    return this.convertLineBreakToHTML(vdesc);
                else 
                    return this.convertLineBreakToHTML(this.card.description) || "N/A"
            }

            return "N/A"
        }
    },
    props: {
        card: {
            type: Object,
            default: null
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        show(next) {
            this.$nextTick( () => {
                if(next) this.showModal();
                else this.hideModal();
            });
        }
    },
    methods: {
        showModal() {
            console.log("showing modal");
            this.$refs['card-view-modal'].show();
        },
        hideModal() {
            console.log("hiding modal");
            this.$refs['card-view-modal'].hide();
        },
        handleHidden() {
            this.show = false;
            this.$emit('hidden');
        },
        convertLineBreakToHTML(string) {
            if(!string) return string;
            return string.replace(/\\n/g, '<br/>')
        }
    }
}
</script>

<style scoped>
.cardId {
    font-size:small;
}

.data-row {
    text-align: left;
}

.left-aligned {
    padding-left: 0px;
}

.damage {
    text-align: right;
    font-family: 'Courier New';
    font-size:large;
    font-weight:bold;
    vertical-align: center;
    padding:5px;
    font-size:20px;
}

.image {
    margin-left:30%;
    margin-right:25%;
    border-radius: 5px;
    border-style: solid;
    border-color:black;
    border-width: 1px;
    margin-bottom:10px;

    image-rendering: crisp-edges;
    image-rendering: -moz-crisp-edges;          /* Firefox */
    image-rendering: -o-crisp-edges;            /* Opera */
    image-rendering: -webkit-optimize-contrast; /* Webkit (non-standard naming)*/
    -ms-interpolation-mode: nearest-neighbor;   /* IE (non-standard property) */
}
</style>