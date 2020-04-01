<!-- Very similar to CardInspectModal except is a card component that does not show/hide -->

<template>
    <b-card centered hide-footer
        size="sm" 
        header-bg-variant="dark"
        header-text-variant="light">
        <template v-slot:header v-if="!!card">
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
                    <CodeBadge :cardId="card.id" v-if="!noid"/>
                    <CodeBadge :codeFamily="card.codeFamily" :code="card.code" v-if="noid"/>
                </b-col>
                <b-col cols="2" class="left-aligned"> 
                    <Element :type="card.element? card.element : 'None'"/>
                </b-col>
                <b-col cols="8" class="damage">
                    {{ (card.damage > 0)? card.damage : '-' }}
                </b-col>
            </b-row>
            <b-row>
                <b-textarea disabled :value="getCardDescription"/>
            </b-row>
        </b-container>
    </b-card>
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
        noid: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        convertLineBreakToHTML(string) {
            if(!string) return string;
            return string.replace(/\\n/g, '\n')
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