<template>
  <div>
    <draggable tag="ul" class="list-group list-group-flush" :move="onMoveCard" @end="onEnd">
      <transition-group type="transition" :name="'card-list'">
        <li class="list-group-item mx-1 mb-2" v-for="card in cards" :key="card.position" @click="openCard(card)">
          {{card.title}}
          <div v-if="card.description">
            =
          </div>
          <div class="badge badge-pill mr-1" v-bind:class="'badge-' + label" v-for="label in card.labels">
            {{label}}
          </div>
        </li>
      </transition-group>
    </draggable>

    <div v-if="showCard">
      <div class="modal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div v-if="card">
              <div class="modal-header">
                <h5 class="modal-title">
                  <div class="input-group">
                    <input @change="updateCard(card)" v-model="card.title" class="form-control transparent"/>
                  </div>
                  <div class="badge badge-pill mr-1" v-bind:class="'badge-' + label" v-for="label in card.labels">
                    {{label}}
                  </div>
                </h5>
                <button type="button" class="close" aria-label="Close" @click="closeCard">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-10">
                    <div class="input-group">
                      <textarea @change="updateCard(card)" v-model="card.description" class="form-control"></textarea>
                    </div>
                  </div>
                  <div class="col-2">
                    <div class="dropdown">
                      <button class="btn btn-light mb-2" @click="toggleLabelMenu">Labels</button>
                      <div v-if="showLabelMenu" class="dropdown-menu">
                        <span class="dropdown-header">
                          Labels
                          <button type="button" class="close" aria-label="Close" @click="toggleLabelMenu">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </span>
                        <a v-for="label in labels" class="dropdown-item text-white" v-bind:class="'bg-' + label" @click="toggleLabel(label)">
                          {{label}}
                        </a>
                      </div>
                    </div>
                    <button class="btn btn-danger mb-2">Delete</button>
                  </div>
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
        showCard: false,
        showLabelMenu: false,
        labels: ["success", "warning", "danger", "info", "primary"]
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
        this.showLabelMenu = false
      },
      updateCard: debounce((card) => {
        axios
        .patch(`/api/cards/${card._id.$oid}`, {
          list_id: card.list_id.$oid,
          position: card.position,
          title: card.title,
          description: card.description,
          labels: card.labels
        })
        .then(response => (
          console.log(response)
        ))
      }, 250),
      toggleLabelMenu() {
        this.showLabelMenu = !this.showLabelMenu
      },
      toggleLabel(label) {
        let idx = this.card.labels.indexOf(label);
        if(idx !== -1) {
          this.card.labels.splice(idx, 1);
        } else {
          this.card.labels.push(label);
        }
        this.updateCard(this.card)
      }
    },
    components: {
      draggable,
      axios,
      debounce
    }
  }
</script>
