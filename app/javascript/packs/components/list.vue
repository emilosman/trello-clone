<template>
  <draggable :move="onMoveList">
    <transition-group class="row px-2" type="transition" :name="'list-list'">
      <div class="col-2" v-for="list in lists" :key="list.position">
        <div class="card bg-light mr-2">
          <div class="card-header">
            <input @change="updateList(list)" type="text" v-model="list.title"/>
          </div>
          <card :cards="list.cards"></card>
          <card-footer :list=list></card-footer>
        </div>
      </div>
    </transition-group>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable'
  import axios from 'axios'
  import debounce from 'debounce'
  import card from './card'
  import cardFooter from './card-footer'

  export default {
    props: {
      lists: Array
    },
    methods: {
      onMoveList(list) {
        console.log(list)
      },
      updateList: debounce((list) => {
        axios
        .patch(`/api/lists/${list._id.$oid}`, {
          position: list.position,
          title: list.title,
        })
        .then(response => (
          console.log(response)
        ))
      }, 250)
    },
    components: {
      draggable,
      axios,
      debounce,
      card,
      cardFooter
    }
  }
</script>
