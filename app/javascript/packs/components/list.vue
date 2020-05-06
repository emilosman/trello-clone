<template>
  <draggable handle=".card-header" :list="lists" @end="updateListOrder">
    <transition-group class="row px-2" type="transition" :name="'list-list'">
      <div class="col-2" v-for="list in lists" :key="list.position">
        <div class="card bg-light">
          <div class="card-header">
            <input @change="updateList(list)" type="text" v-model="list.title" class="transparent"/>
          </div>
          <div class="list-body">
            <card :cards="list.ordered_cards"></card>
          </div>
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
      updateList: debounce((list) => {
        axios
          .patch(`/api/lists/${list._id.$oid}`, {
            position: list.position,
            title: list.title,
          })
          .then(response => (
            console.log(response)
          ))
      }, 250),

      updateListOrder() {
        let orderedLists = this.lists.map((list, index, arr) => {
          return {
            'id': list._id.$oid,
            'position': index
          }
        })
        axios
          .post(`/api/lists/list_order`, {
            ordered_lists: orderedLists
          })
          .then(response => (
            console.log(response)
          ))
      },
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
