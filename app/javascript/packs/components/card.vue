<template>
  <div>
    <draggable tag="ul" class="list-group list-group-flush" :move="onMoveCard" @end="onEnd">
      <transition-group type="transition" :name="'card-list'">
        <li class="list-group-item mx-1 mb-2" v-for="card in cards" :key="card.position" @click="openCard(card)">
          {{card.title}}
        </li>
      </transition-group>
    </draggable>
    <div v-if="showCard">
      <div class="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div v-if="card">
              <div class="modal-header">
                <h5 class="modal-title">
                  <div class="input-group">
                    <input @change="updateCard(card)" v-model="card.title" class="form-control"/>
                  </div>
                </h5>
                <button type="button" class="close" aria-label="Close" @click="closeCard">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="input-group">
                  <textarea @change="updateCard(card)" v-model="card.description" class="form-control"></textarea>
                </div>
              </div>
            </div>
            <div v-else>
              loading
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop show"></div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import axios from 'axios'
  import debounce from 'debounce'  

  export default {
    props: {
      cards: Array
    },
    data: () => {
      return {
        showCard: false
      }
    },
    methods: {
      //movement
      onMoveCard(card) {
        console.log(card)
      },
      onEnd(e) {
        console.log(e)
      },
      openCard(card) {
        this.showCard = true
        this.card = card
      },
      closeCard() {
        this.showCard = false
      },
      updateCard: debounce((card) => {
        axios
        .patch(`/api/cards/${card._id.$oid}`, {
          list_id: card.list_id.$oid,
          position: card.position,
          title: card.title,
          description: card.description
        })
        .then(response => (
          console.log(response)
        ))
      }, 250),
    },
    components: {
      draggable,
      axios,
      debounce
    }
  }
</script>
