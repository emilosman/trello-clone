<template>
  <div>
    <draggable tag="ul" class="list-group list-group-flush" :move="onMoveCard" @end="onEnd">
      <transition-group type="transition" :name="'card-list'">
        <li class="list-group-item list-group-item-action mb-2" v-for="card in cards" :key="card.position" @click="openCard(card)">
          {{card.title}}
          <div v-if="card.description">
            =
          </div>
          <div v-if="card.checklist && card.checklist.items" class="small" v-bind:class="{'badge badge-pill badge-success': card.checklist.items.filter((item)=> item.done == true).length == card.checklist.items.length}">
            ✓[{{card.checklist.items.filter((item)=> item.done == true).length}}/{{card.checklist.items.length}}]
          </div>
          <div>
            <div class="badge badge-pill mr-1 mb-1" v-bind:class="'badge-' + label" v-for="label in card.labels">
              {{label}}
            </div>
          </div>
          <div class="small">
            {{card.due_date}}
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
                </h5>
                <button type="button" class="close" aria-label="Close" @click="closeCard">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-9">
                    <div v-if="card.labels && card.labels.length > 0" class="d-inline-block mr-4 mb-4">
                      <h6>Labels</h6>
                      <span class="badge badge-pill mr-1" v-bind:class="'badge-' + label" v-for="label in card.labels">
                        {{label}}
                      </span>
                    </div>
                    <div v-if="card.due_date" class="d-inline-block mr-4 mb-4">
                      <h6>Due date</h6>
                      <span class="small">
                        {{card.due_date}}
                      </span>
                    </div>
                    <h6>Description</h6>
                    <div class="input-group">
                      <textarea @change="updateCard(card)" v-model="card.description" class="form-control mb-4"></textarea>
                    </div>
                    <div v-if="card.checklist && card.checklist.items" class="mb-4">
                      <card-checklist :checklist="card.checklist" v-on:change="updateCard(card)"></card-checklist>
                    </div>
                  </div>

                  <div class="col-3">
                    <h6>Card Options</h6>
                    <div class="dropdown">
                      <button class="btn btn-light btn-block text-left mb-2" @click="toggleLabelMenu">
                        Labels
                        <button type="button" class="close" v-if="showLabelMenu">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </button>
                      <div v-if="showLabelMenu" class="dropdown-menu py-0">
                        <a v-for="label in labels" class="dropdown-item text-white" v-bind:class="'bg-' + label" @click="toggleLabel(label)">
                          <span v-if="card.labels.indexOf(label) > -1" >✓</span>
                          {{label}}
                        </a>
                      </div>
                    </div>
                    <button class="btn btn-light btn-block text-left mb-2" @click="addChecklist(card)">Checklist</button>
                    <a class="btn btn-light btn-block text-left mb-2">
                      Due Date
                      <date-pick v-model="card.due_date" :pickTime="true" :format="'YYYY-MM-DD HH:mm'"></date-pick>
                    </a>
                    <button class="btn btn-danger btn-block text-left mb-2">Delete</button>
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
  import DatePick from 'vue-date-pick';
  import 'vue-date-pick/dist/vueDatePick.css';
  import cardChecklist from './card-checklist'

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
          labels: card.labels,
          checklist: card.checklist,
          due_date: card.due_date
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
      },
      addChecklist(card) {
        if (! (card.checklist && card.checklist.items) ) {
          card.checklist = {
            items: [
              {
                position: 0,
                title: null,
                done: false
              }
            ]
          }
        }
      }
    },
    components: {
      draggable,
      axios,
      debounce,
      DatePick,
      cardChecklist
    }
  }
</script>
