/* eslint no-console: 0 */

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import App from '../app.vue'
import draggable from 'vuedraggable'
import axios from 'axios'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
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
        title: null,
        lists: []
      }
    },
    mounted () {
      axios
        .get('http://localhost:3000/api/boards/5e9c292318338d0f425fa0fb')
        .then(response => (
          console.log(response.data),
          this.title = response.data.title,
          this.lists = response.data.lists,
          console.log(this.lists)
        ))
    },
    methods: {
      onMove(item) {
        console.log(item)
      },
      onEnd(e) {
        console.log(e)
      },
      addItem(list) {
        console.log(list)
      },
      openCard(card) {
        console.log(card)
      }
    },
    components: { App, draggable }
  })
})
