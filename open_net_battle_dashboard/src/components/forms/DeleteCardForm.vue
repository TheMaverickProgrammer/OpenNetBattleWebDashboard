<template>
    <div class="form-body">
        <b-form @submit="onSubmit">
            <b-card-group vertical>
                <b-col cols="4">
                  <label>Choose a card to delete from the system:</label>
                  <b-form-checkbox switch v-model="codeOnly" @change="reset">Delete By Code</b-form-checkbox>
                  <b-form-select v-model="selected" :options="cardOptions" v-if="codeOnly"></b-form-select>
                  <b-form-select v-model="selected" :options="modelOptions" v-if="!codeOnly"></b-form-select>
                  <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                  <b-button class="submit" ref="submit" type="submit" :disabled="isBusy">Submit</b-button>
                </b-col>
                <b-col cols="5"/> <!-- Empty for spacing -->
                <b-col cols="3">
                    Preview:
                    <CardInspectItem :card="getSelectedPreview" :noid="!codeOnly"/>
                </b-col>
            </b-card-group>
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
    computed: {
      ...mapGetters('cards', ['getCardById', 'getCardsByModelId']),
      getSelectedPreview() {
        if(this.codeOnly) {
          return this.getCardById(this.selected);
        }

        return this.getCardsByModelId(this.selected)[0];
      },
      cardOptions() {
        let options = [];
        this.$store.state.cards.list.forEach(card => {
          options = [...options, {text: card.name + ' ' + card.code, value: card.id}];
        });
        return options;
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
      reset() {
        this.selected = null;
      },
      onSubmit(evt) {
          evt.preventDefault()
          if(this.codeOnly) {
            this.deleteCardById(this.selected);
          } else {
            this.deleteCardsByModel(this.selected);
          }
      },
      deleteCardById(id) {
          this.isBusy = true;

          this.$api.delete.card(id).then(response => {
              let alert = { message: response.message, type: "success", title: "Card Deleted" };
              this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
          }).catch(err => {
              let alert = { message: err, type: "danger", title: "Internal Error" };
              this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
          }).finally(()=> {
              this.isBusy = false; // Done
              this.selected = null;
          });
      },
      deleteCardsByModel(modelId) {
          this.isBusy = true;

          this.$api.delete.cardModel(modelId).then(response => {
              let alert = { message: response.data.data.message, type: "success", title: "All Cards Deleted" };
              this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
          }).catch(err => {
              let alert = { message: err, type: "danger", title: "Internal Error" };
              this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
          }).finally(()=> {
              this.isBusy = false; // Done
              this.selected = null;
          });
      },
      fetch() {
          this.isBusy = true;

          // First time loading table get everything, then `updated` will be set to Date.now()
          this.$api.get.cardsAfterDate(this.lastUpdated).then(response => {
              let payload = response.data;

              payload.data.forEach(card => {
                  this.$api.prefetchCardById(card._id)
              });
          }).catch(err => {
              let alert = { message: err, type: "danger", title: "Internal Error" };
              this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
          }).finally(()=> {
              this.isBusy = false; // Done
              this.lastUpdated = Date.now();
          });
      },
    },
    data() {
      return {
        isBusy: false,
        codeOnly: false,
        selected: null,
        lastUpdated: 0,
        preview: { 
            element: 'None', secondaryElement: 'None', name: 'Unnamed', damage: 0, 
            description: 'No desc given', verboseDescription: 'No description given',
            image: '', icon: '', code: 'A', codeFamily: [], id: "Not Registered"
        },
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