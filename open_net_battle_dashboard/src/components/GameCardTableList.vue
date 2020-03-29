<template>
  <div>
    <b-modal ref="folder-view-modal" hide-footer :title="preview.name">
      <div class="d-block text-center">
        <h3>Hello From Card View Modal!</h3>
      </div>
      <b-button class="mt-2" variant="outline-primary" block @click="hideModal">Close</b-button>
    </b-modal>

    <b-table
      sticky-header
      ref="selectableTable"
      selectable
      select-mode="multi"
      :items="$store.state.cards.list"
      :fields="fields"
      :busy="isBusy"
      @row-selected="onRowSelected"
      responsive="lg"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(image)="data">
        <img :src="data.value"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(icon)="data">
        <img :src="data.value"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(damage)="data">
        <div v-if="data.value <= 0">
            -
        </div>
        <div v-else>
            {{data.value}}
        </div>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(element)="data">
        {{data.value}}
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(name)="data">
        <a href="#">{{data.value}}</a>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(verboseDescription)="data">
        <a href="#">Open in link</a> {{data?'':''}}
      </template>

      <!-- Example scoped slot for select state illustrative purposes -->
      <template v-slot:cell(selected)="{ rowSelected }">
        <template v-if="rowSelected">
          <span aria-hidden="true">&check;</span>
          <span class="sr-only">Selected</span>
        </template>
        <template v-else>
          <span aria-hidden="true">&nbsp;</span>
          <span class="sr-only">Not selected</span>
        </template>
      </template>
    </b-table>
    <p>
      <b-button size="sm" @click="selectAllRows">Select all</b-button>
      <b-button size="sm" @click="clearSelected">Clear selected</b-button>
    </p>
    <p>
      Selected Rows:<br>
      {{ selected }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            preview: { name: "" },
            fields: [ 
                { key: 'image', sortable: false },
                { key: 'icon', sortable: false },
                { key: 'name', sortable: true },
                { key: 'damage', sortable: true },
                { key: 'code', sortable: true },
                { key: 'element', sortable: true},
                { key: 'secondaryElement', sortable: true },
                { key: 'description', sortable: false },
                { key: 'verboseDescription', sortable: false}
            ],
            selectMode: 'multi',
            selected: [],
            isBusy: false
        }
    },
    methods: {
        onRowSelected(items) {
            this.selected = items
        },
        selectAllRows() {
            this.$refs.selectableTable.selectAllRows()
        },
        clearSelected() {
            this.$refs.selectableTable.clearSelected()
        },
        showModal(card) {
            this.preview = card;
            this.$refs['card-view-modal'].show();
        },
        hideModal() {
            this.$refs['card-view-modal'].hide();
        }
    },
    mounted() {
        this.isBusy = true;

        let numOfCards = 0;
        let cardIndex = 0;

        let self = this;

        // Simulate an async request
        axios.get('http://battlenetwork.io:3000/v1/cards', 
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            }, 
        )
        .then(response => {
            let payload = response.data;

            numOfCards = payload.data.length;

            payload.data.forEach( async element => {
                let code = element.code;
                let cardId = element._id;
                let modelId = element.modelId;

                await axios.get('http://battlenetwork.io:3000/v1/card-models/'+modelId, 
                    {
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
                        withCredentials: true
                    },
                ).then(response => {
                    let payload = response.data;
                    let model = payload.data;

                    let cardEntry = model; // explicit card detail is provided in a property
                    cardEntry.code = code; // Map this card's code back
                    delete cardEntry.codes; // plural `codes` array is only used by the model 
                    this.$store.dispatch('cards/addCard', cardEntry, { namespaced: true});
                }).catch(err => {
                    let alert = { message: "Problem loading card with id " + cardId + ".\n" + err, type: "danger" };
                    this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
                }).finally( () => {
                    cardIndex = cardIndex + 1;

                    if(cardIndex == numOfCards) {
                        self.isBusy = false; // Done
                    }
                });
            });
        }).catch(err => {
            let alert = { message: err, type: "danger" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });
    }
}
</script>