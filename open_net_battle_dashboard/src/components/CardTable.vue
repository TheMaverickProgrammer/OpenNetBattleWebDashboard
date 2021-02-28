<template>
  <div class="app-background">
    <CardInspectModal :card="inspectCard" :show="!!inspectCard" @hidden="handleHiddenModal"/>

    <h2 v-if="header.length > 0">{{this.header}}</h2>
      <b-row class="filter">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button variant="danger" :disabled="!filter" @click="onClearFilter">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-row>
    <b-table
      id="card-table"
      sticky-header="500px"
      responsive="lg"
      ref="selectableTable"
      :selectable="selectable"
      :select-mode="selectMode"
      :items="cards"
      :fields="fields"
      :busy="busy"
      :per-page="perPage"
      :current-page="currentPage"
      :filter="filter"
      @filtered="onFiltered"
      @row-selected="onRowSelected"
    >
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(actions)="data" v-if="hasActions">
        <p class="h3 mb-2" @click="$emit('remove-cards', [data.item])">
          <b-icon variant="danger" icon="x-circle" class="action" v-if="removable" v-b-tooltip.hover.top="'Remove card'"/>
        </p>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(image)="data">
        <img :src="data.value"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(icon)="data">
        <img :src="data.value" class="icon pixel-perfect"/>
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
      <template v-slot:cell(code)="data">
        <CodeBadge :cardId="data.item.id"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(element)="data">
        <Element :type="data.value"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(secondaryElement)="data">
        <Element :type="data.value"/>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(name)="data">
        <a href="#" :class="getAnchorCSSClass(data.item.class)" @click="showModal(data.item)">{{data.value}}</a>
      </template>

      <!-- A custom formatted column -->
      <template v-slot:cell(verboseDescription)="data">
        <a href="#" @click="showModal(data.item)">Open in link</a>
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

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="card-table"
      align="center"
    />

    <div v-if="selectable">
      <b-button-group>
        <b-button variant="outline-warning" @click="selectAllRows">Select All</b-button>
        <b-button variant="outline-danger" @click="clearSelected">Clear</b-button>
      </b-button-group>

      <b-card class="selectionQueue">
        <span :key="card._id" v-for="card in selected">
            <a href="#" @click="showModal(card)">
              <img :src="card.image" v-b-tooltip.hover.top="card.name + ' (' + card.code + ')'" class="queued"/>
            </a>
        </span>
        <span v-if="selected.length==0">
          &lt; no selection &gt;
        </span>
        <br>
        <template v-slot:footer>
          <b-button @click="handleSubmit" :variant="selected.length == 0? 'outline-secondary' : 'success'" :disabled="selected.length == 0">Add To Folder</b-button>
        </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import Element from './Element'
import CodeBadge from './CodeBadge'
import CardInspectModal from './CardInspectModal'

export default {
    components: {
      Element,
      CardInspectModal,
      CodeBadge
    },
    props: {
      header: {
        default: "",
        type: String
      },
      selectable: {
        default: false,
        type: Boolean
      },
      removable: {
        default: false,
        type: Boolean
      },
      cards: {
        default: new Array(),
        type: Array
      },
      busy: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      hasActions() {
        return this.removable; // add more conditions as see fit
      },
    },
    watch: {
      currentPage() {
        // will make the scrollbar reset
        this.$refs.selectableTable.$el.scrollTop = 0;

      },
      cards() {
        this.rows = this.cards.length;
      }
    },
    data() {
      let fields = [
        { key: 'image', sortable: false },
        { key: 'icon', sortable: false },
        { key: 'name', sortable: true },
        { key: 'damage', sortable: true },
        { key: 'code', sortable: true },
        { key: 'element', sortable: true},
        { key: 'secondaryElement', label: '2nd Element', sortable: true },
        { key: 'limit', sortable: true },
        { key: 'description', sortable: false },
        { key: 'verboseDescription', label: 'More', sortable: false}
      ];

      if(this.removable) {
        fields = [ 'actions', ...fields];
      }

      return {
        preview: { name: "" },
        fields: fields,
        selectMode: 'multi',
        selected: [],
        perPage: 20,
        currentPage: 1,
        rows: 0,
        inspectCard: null,
        filter:null
      }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items;
    },
    selectAllRows() {
      this.$refs.selectableTable.selectAllRows()
    },
    clearSelected() {
      this.$refs.selectableTable.clearSelected()
    },
    showModal(card) {
      this.inspectCard = card;
    },
    getPreview() {
      return this.preview;
    },
    handleSubmit() {
      this.$emit('submit-cards', this.selected);
      this.clearSelected();
    },
    handleHiddenModal() {
      this.inspectCard = null;
    },
    getAnchorCSSClass(classNum) {
      switch(classNum) {
        case 1:
          return "StandardText";
        case 2:
          return "MegaText";
        case 3:
          return "GigaText";
        case 4: 
          return "DarkText";
        default:
          return "StandardText";
      }
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.rows = filteredItems.length;
      this.currentPage = 1;
    },
    onClearFilter() {
      this.filter = null;
      this.currentPage = 1;
      this.rows = this.cards.length;
    }
  },
  mounted() {
    // if cards are supplied through props (and are static)
    this.rows = this.cards.length;
  }
}
</script>

<style scoped>

.filter {
  font-weight:bold;
  margin-left:5px;
}

.action {
  margin-right: 5px;
}

.action:hover {
  cursor:pointer;
}

.queued:hover {
  border-color:aquamarine;
  border-width: 5px;
  border-style:inset;
  margin-bottom:-10px;;
}

.selectionQueue {
  margin-top: 10px;
}

.icon {
  width: 28px;
  height: 28px;
}

</style>