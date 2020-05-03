<template>
  <div>
    <div class="input-group mb-2" v-for="item in checklistItems">
      <div class="input-group-prepend">
        <div class="input-group-text">
          <input type="checkbox" v-on:change="$emit('change')" v-model="item.done">
        </div>
      </div>
      <input v-model="item.title" v-on:change="$emit('change')" v-bind:class="{'checklist-item--done' : item.done}" text="text" class="form-control" placeholder="Add checklist item"/>
      <div class="input-group-append">
        <a class="input-group-text">&times;</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      checklistItems: Array,
    }
  }
</script>
