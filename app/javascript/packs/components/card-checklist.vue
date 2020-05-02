<template>
  <div>
    <h6>Checklist</h6>
    <div class="progress mb-2">
      <div class="progress-bar" role="progressbar" v-bind:style="'width:' + progressValue +'%'" v-bind:class="{'bg-success': progressValue == 100}"></div>
    </div>
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
    computed: {
      progressValue: function () {
        return this.checklist.items.filter((item)=> item.done == true).length / this.checklist.items.length * 100
      }
    },
    components: {
      checklistItem
    }
  }
</script>
