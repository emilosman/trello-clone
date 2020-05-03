<template>
  <div class="card-footer">
    <div v-if="showNewCard">
      <div class="input-group">
        <input type="text" v-model="newCard.title" class="form-control mb-2" placeholder="Add card title"/>
      </div>
      <button class="btn btn-success" @click="createCard(list)">
        New card
      </button>
      <button type="button" class="close" aria-label="Close" @click="toggleNewCard">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div v-else>
      <button class="btn btn-light" @click="toggleNewCard">
        + Add card
      </button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import debounce from 'debounce'

  export default {
    props: {
      list: Object
    },
    data: () => {
      return {
        showNewCard: false,
        newCard: {
          title: null,
          position: null,
          list_id: {
            $oid: null
          }
        }
      }
    },
    methods: {
      toggleNewCard() {
        this.showNewCard = !this.showNewCard
      },
      createCard(list) {
        this.newCard.list_id.$oid = list._id.$oid
        this.newCard.position = list.cards.length

        axios
          .post(`/api/cards`, {
            list_id: this.newCard.list_id.$oid,
            position: this.newCard.position,
            title: this.newCard.title
          })
          .then(response => (
            this.newCard = response.data,
            list.cards.push(this.newCard),
            this.showNewCard = false,
            this.newCard = {
              title: null,
              position: null,
              list_id: {
                $oid: null
              }
            }
          ))
      }
    },
    components: {
      axios,
      debounce
    }
  }
</script>
