/* eslint no-console: 0 */

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'
import draggable from 'vuedraggable'
import axios from 'axios'
import debounce from 'debounce'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const cards = [
    "item 1",
    "item 2",
    "item 3",
    "item 4",
    "item 5",
    "item 6",
    "item 7"
  ];

  const app = new Vue({
    el: '#app',
    data: () => {
      return {
        showCard: false,
        showNewCard: false,
        newCard: {
          title: null,
          position: null,
          list_id: {
            $oid: null
          }
        },
        card: null,
        boardTitle: null,
        lists: []
      }
    },
    mounted () {
      axios
        .get('/api/boards/5e9c292318338d0f425fa0fb')
        .then(response => (
          this.boardTitle = response.data.title,
          this.lists = response.data.lists,
          console.log(this.lists)
        ))
    },
    methods: {
      //movement
      onMove(item) {
        console.log(item)
      },
      onEnd(e) {
        console.log(e)
      },

      //new card
      openNewCard() {
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
            list.cards.push(this.newCard)
          ))
      },

      //edit card
      openCard(card) {
        this.showCard = true
        this.card = card
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
      }, 250)
    },
    components: { App, draggable }
  })
})
