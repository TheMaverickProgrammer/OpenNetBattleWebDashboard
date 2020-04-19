<template>
    <b-card>
        <b-form @submit="onSubmit">
            <b-card-group vertical>
                <label>Choose a card to delete from the system:</label>
                <b-form-select v-model="selected" :options="options"></b-form-select>
                <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
                <div>
                    <b-form-checkbox switch v-model="codeOnly">Delete By Code</b-form-checkbox>
                    <b-form-select :disabled="!codeOnly"></b-form-select>
                </div>
                <b-button class="submit" ref="submit" type="submit" :disabled="isBusy">Submit</b-button>
            </b-card-group>
        </b-form>
    </b-card>
</template>

<script>
  export default {
    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            alert(JSON.stringify(evt))
        },
    },
    data() {
      return {
        isBusy: false,
        codeOnly: false,
        selected: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Selected Option' },
          { value: { C: '3PO' }, text: 'This is an option with object value' },
          { value: 'd', text: 'This one is disabled', disabled: true }
        ]
      }
    }
  }
</script>

<style scoped>

</style>