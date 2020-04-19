<template>
  <div class="form-body">
    <b-form @submit="onSubmit" @reset="onReset">
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
                        <b-form-checkbox-group>
                            <b-form-checkbox value="isTFC">TFC</b-form-checkbox>
                            <b-form-checkbox value="isAttackModifier">Attack modifier</b-form-checkbox>
                        </b-form-checkbox-group>
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
                    :options="['None','Fire','Electric','Wood','Aqua','Break','Plus','Summon','Cursor']"
                    :selected="'None'"
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
                    :options="['None','Fire','Electric','Wood','Aqua','Break','Plus','Summon','Cursor']"
                    :selected="'None'"
                    ></b-form-select>
                </b-form-group>
            </b-col>
            <b-col cols="4">
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
                
                <b-form-group 
                    description="Click to open script editor for card">
                    <b-button variant="dark">
                        <b-icon-code-slash @click="handleEditCode"/>
                    </b-button>
                </b-form-group>

                <!-- Form buttons go here b/c it looks better -->
                <b-button-group>
                    <b-button type="submit" variant="info">Submit</b-button>
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
    data() {
        return {
            preview: { 
                element: 'None', secondaryElement: 'None', name: 'Unnamed', damage: 0, 
                description: 'No desc given', verboseDescription: 'No description given',
                image: '', icon: '', code: 'A', codeFamily: [], id: "Not Registered"
            },
            codeFamilyString: "A"
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();

            let copy = Object.assign({}, this.preview);
            copy.codes = copy.codeFamily;
            delete copy.codeFamily;

            this.$api.add.cardModel(copy).then((response)=>{
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
        onReset(evt) {
            evt? evt.preventDefault() : 0;
            // Reset our form values
            this.preview = { 
                element: 'None', secondaryElement: 'None', name: 'Unnamed', damage: 0, 
                description: 'No desc given', verboseDescription: 'No description given',
                image: '', icon: '', code: 'A', codeFamily: "A"
            }
        },
        nameFormatter(value) {
            let max = value.length < 8? value.length : 8;
            return value.slice(0, max);
        },
        damageFormatter(value) {
            value = Number(value);
            if(value < 0) value = 0;
            if(value > 9999) value = 9999;
            return value;
        },
        handleEditCode(evt) {
            evt.preventDefault();
            this.$router.push('/cards/0/edit/script');
        }
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