<template>
  <div>
    <h6>Checklist</h6>
    <checklist-item :checklistItems="checklist.items" v-on:change="$emit('change')"></checklist-item>
    <button class="btn btn-light" @click="addChecklistItem">
      + Add item
    </button>
  </div>
</template>

<script>
  import checklistItem from './checklist-item'

  export default {
    props: {
      checklist: Object
    },
    methods: {
      addChecklistItem() {
        this.checklist.items.push(
          {
            position: this.checklist.items.length,
            title: null,
            done: false
          }
        )
      }
    },
    components: {
      checklistItem
    }
  }
</script>
