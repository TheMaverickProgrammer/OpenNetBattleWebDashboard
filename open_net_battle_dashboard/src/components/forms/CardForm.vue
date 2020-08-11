<template>
  <div class="form-body">
    <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
            <b-col cols="4" v-if="isEditting">
                <label>Choose a card to update from the system:</label><br/>
                <b-form-select v-model="selected" :options="modelOptions" @change="handleSelectionChange" v-if="!isBusy"></b-form-select>
                <b-spinner variant="primary" label="Spinning" v-if="isBusy"></b-spinner>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="2">
                    <b-form-group
                        id="input-group-1"
                        label="Name:"
                        label-for="input-1"
                        description="8 chars max in-game"

                    >
                        <b-form-input
                        id="input-1"
                        :formatter="nameFormatter"
                        v-model="preview.name"
                        required
                        placeholder="e.g. Reflct"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-2" 
                        label="Damage" 
                        label-for="input-2"
                        description="Set to 0 for N/A"
                        >
                        <b-form-input
                        :formatter="damageFormatter"
                        id="input-2"
                        step="5"
                        v-model="preview.damage"
                        required
                        type="number"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group 
                        id="input-group-3" 
                        label="Codes:" 
                        label-for="input-3"
                        description="Comma separated"
                        >
                        <b-form-input
                        id="input-3"
                        v-model="codeFamilyString"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-4">
                        <b-form-checkbox v-model="preview.timeFreeze">TimeFreeze</b-form-checkbox>
                    </b-form-group>
            </b-col>
            <b-col cols="2">
                <b-form-group
                    id="input-group-5"
                    label="Image URL:"
                    label-for="input-5"
                    description="Required size is 56x48 pixels"

                >
                    <b-form-input
                    id="input-5"
                    v-model="preview.image"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-6" 
                    label="Icon URL:" 
                    label-for="input-6"
                    description="Required size is 14x14 pixels"
                    >
                    <b-form-input
                    id="input-6"
                    v-model="preview.icon"
                    not-required
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-7" 
                    label="Element 1:" 
                    label-for="input-7"
                    description="Primary element"
                    >
                    <b-form-select
                    id="input-7"
                    v-model="preview.element"
                    required
                    :options="['None','Fire','Electric','Wood','Aqua','Wind','Break','Plus','Summon','Cursor']"
                    ></b-form-select>
                </b-form-group>
                <b-form-group 
                    id="input-group-8" 
                    label="Element 2:" 
                    label-for="input-8"
                    description="Hidden element"
                    >
                    <b-form-select
                    id="input-8"
                    v-model="preview.secondaryElement"
                    required
                    :options="['None','Fire','Electric','Wood','Aqua','Wind','Break','Plus','Summon','Cursor']"
                    ></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="2">               
                <b-form-group 
                    id="input-group-11" 
                    label="Action:" 
                    label-for="input-11"
                    description="Invoke animation"
                    >
                    <b-form-select
                    id="input-11"
                    v-model="preview.action"
                    required
                    :options="['Idle','Shoot', 'Swing', 'Hit', 'Throw']"
                    ></b-form-select>
                </b-form-group>

                <b-form-group 
                    id="input-group-12" 
                    label="Class:" 
                    label-for="input-12"
                    description="Rank of card"
                    >
                    <b-form-select
                    id="input-12"
                    v-model="preview.class"
                    required
                    :options="['Standard','Mega', 'Giga', 'Dark']"
                    ></b-form-select>
                </b-form-group>

                <b-form-group 
                        id="input-group-13" 
                        label="Limit" 
                        label-for="input-13"
                        description="Min of 1"
                        >
                        <b-form-input
                        :formatter="limitFormatter"
                        id="input-13"
                        v-model="preview.limit"
                        required
                        type="number"
                        ></b-form-input>
                    </b-form-group>

            </b-col>
            <b-col>
                <b-form-group
                    id="input-group-9"
                    label="Description:"
                    label-for="input-9"
                    description="Max 30 chars"

                >
                    <b-form-input
                    id="input-9"
                    v-model="preview.description"
                    required
                    ></b-form-input>
                </b-form-group>

                <b-form-group 
                    id="input-group-10" 
                    label="Long Desc.:" 
                    label-for="input-10"
                    description="Help guide. Max 300 chars"
                    >
                    <b-form-textarea
                    id="input-10"
                    v-model="preview.verboseDescription"
                    required
                    ></b-form-textarea>
                </b-form-group>

                <!-- Form buttons go here b/c it looks better -->
                <b-button-group>
                    <b-button variant="dark">
                        <b-icon-code-slash @click="handleEditCode"/>
                    </b-button>
                    <b-button type="submit" variant="info" v-if="!isEditting">Submit</b-button>
                    <b-button type="submit" variant="info" v-if="isEditting" >Edit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-button-group>
            </b-col>
            <b-col cols="1"/> <!-- Empty for spacing -->
            <b-col cols="3">
                Preview:
                <CardInspectItem :card="preview" noid/>
            </b-col>
        </b-row>
    </b-form>
  </div>
</template>

<script>
import CardInspectItem from '@/components/CardInspectItem'
import { mapGetters } from 'vuex'

export default {
    components: {
        CardInspectItem
    },
    watch: {
        codeFamilyString() {
            this.preview.codeFamily = this.codeFamilyString.toUpperCase().split(',');

            if(this.preview.codeFamily.length > 0)
                this.preview.code = this.preview.codeFamily[0];
            else
                this.preview.code = '';
        }
    },
    props: {
        card: {
            type: Object,
            default: null
        },
        isEditting: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters('cards', ['getCardById', 'getCardsByModelId']),
        getSelectedPreview() {
            let card = {} 
            let ref = this.getCardsByModelId(this.selected)[0];

            Object.assign(card, ref);

            switch(card.class) {
                case 2:
                    card.class = "Mega";
                    break;
                case 3:
                    card.class = "Giga";
                    break;
                case 4:
                    card.class = "Dark";
                    break;
                default:
                    card.class = "Standard";
            }

            return card;
        },
        modelOptions() {
            let options = [];
            this.$store.state.cards.list.forEach(card => {
            options = [...options, {text: card.name, value: card.modelId}];
            });
            
            options = options.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['value']).indexOf(obj['value']) === pos;
            });

            return options;
        }
    },
    methods: {
        handleSelectionChange() {
            this.preview = this.getSelectedPreview;
            this.codeFamilyString = this.preview.codeFamily.toString();
        },
        onSubmit(evt) {
            evt.preventDefault();

            let copy = Object.assign({}, this.preview);
            copy.codes = copy.codeFamily;
            delete copy.codeFamily;

            if(copy.class == "Standard") copy.class = 1;
            if(copy.class == "Mega") copy.class = 2;
            if(copy.class == "Giga") copy.class = 3;
            if(copy.class == "Dark") copy.class = 4;

            copy.id = copy.modelId;
            delete copy.modelId;

            if(this.isEditting) {
                this.updateExistingCard(copy);
            } else {
                this.createNewCard(copy);
            }
        },
        createNewCard(card) {
            this.$api.add.cardModel(card).then((response)=>{
                let payload = response.data;

                let alert = { message: "New card '" + payload.data.name + "' added!", type:"success"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                this.onReset();
            }).catch(err => {
                let payload = err;
                let message = "Unknown error";

                if(typeof payload.response !== 'undefined') {
                    if(typeof payload.response.data !== 'undefined') {
                        message = payload.response.data.error.message;
                    } else {
                        message = "Response: " + payload.response.statusText;
                    }
                }else if(typeof payload.name !== 'undefined') {
                    message = payload.message;
                } // mongo specific error
                else if(typeof payload.errmsg !== 'undefined') {
                    message = payload.errmsg;
                }

                let alert = {message: message, type: "danger", title: "Failed to create card"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            });
        },
        updateExistingCard(card) {
            this.$api.update.cardModel(card).then(response=> {
                let payload = response.data;
                let cardModel = payload.data;
                cardModel.id = cardModel._id;
                delete cardModel._id;

                this.$store.dispatch('cards/updateCardsByModel', cardModel, {namespace: true});
                
                let alert = { message: "Card '" + payload.data.name + "' was updated!", type:"success"};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});

            }).catch(err=> {
                let payload = err;
                let message = "Unknown error";

                if(typeof payload.response !== 'undefined') {
                    if(typeof payload.response.data !== 'undefined') {
                        message = payload.response.data.error.message;
                    } else {
                        message = "Response: " + payload.response.statusText;
                    }
                }else if(typeof payload.name !== 'undefined') {
                    message = payload.message;
                } // mongo specific error
                else if(typeof payload.errmsg !== 'undefined') {
                    message = payload.errmsg;
                }

                let alert = {message: message, type: "danger", title: "Failed to update card"};
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            });
        },
        onReset(evt) {
            evt? evt.preventDefault() : 0;
            // Reset our form values
            this.preview = this.newPreview();

            if(this.isEditting) {
                this.selected = null;
            }
        },
        newPreview() {
            let preview = { 
                element: 'None', secondaryElement: 'None', name: 'Unnamed', damage: 0, 
                description: 'No desc given', verboseDescription: 'No description given',
                image: '', icon: '', code: 'A', codeFamily: [], id: "Not Registered",
                limit: 1, action: 'Shoot', class: "Standard", metaClasses: [], canBoost: false, timeFreeze: false
            };

            return preview;
        },
        nameFormatter(value) {
            let max = value.length < 8? value.length : 8;
            return value.slice(0, max);
        },
        damageFormatter(value) {
            value = Number(value);
            value = value - (value%5); // damage is intervals of 5 units
            if(value < 0) value = 0;
            if(value > 9999) value = 9999;
            return value;
        },
        limitFormatter(value) {
            value = Number(value);
            if(value < 1) value = 1;
            if(value > 5) value = 5;
            return value;
        },
        handleEditCode(evt) {
            evt.preventDefault();
            this.$router.push('/cards/0/edit/script'); // TODO: somehow go to a unique endpoint?
        },
        fetch() {
            this.isBusy = true;

            // First time loading table get everything, then `updated` will be set to Date.now()
            this.$api.get.cardsAfterDate(this.lastUpdated).then(response => {
                let payload = response.data;

                payload.data.forEach(async card => {
                    await this.$api.prefetchCardById(card._id)
                });
            }).catch(err => {
                let alert = { message: err, type: "danger", title: "Internal Error" };
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            }).finally(()=> {
                this.isBusy = false; // Done
                this.lastUpdated = Date.now();
            });
        }
    },
    data() {
        return {
            preview: this.newPreview(),
            codeFamilyString: "A",
            selected: null,
            isMounted: false,
            lastUpdated: 0,
            isBusy: false
        }
    },
    mounted() {
      this.fetch();
    }
}
</script>

<style scoped>
.form-body {
    padding: 1.5rem;
    margin-right: 0;
    margin-left: 0;
    border-width: .2rem;
    text-align: left;
}
</style>