<template>
  <div>
    <b-table
      sticky-header
      ref="selectableTable"
      selectable
      select-mode="multi"
      :items="items"
      :fields="fields"
      @row-selected="onRowSelected"
      responsive="sm"
    >
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
  export default {
    data() {
      return {
        fields: [ 
            { key: 'icon', sortable: false },
            { key: 'name', sortable: true },
            { key: 'damage', sortable: true },
            { key: 'code', sortable: true },
            { key: 'primary element', sortable: true},
            { key: 'secondary element', sortable: true },
            { key: 'card', sortable: false },
            { key: 'description', sortable: false },
            { key: 'verbose description', sortable: false}
        ],
        items: [
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },
          { icon: "invalid.png", name: "Cannon", damage: 40, code: 'A', element: "None", secondElement: "None", card: "url.png", description: "Shoots down field", verboseDescription:"blahblahblah" },

        ],
        selectMode: 'multi',
        selected: []
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
      }
    }
  }
</script>