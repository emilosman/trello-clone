/* eslint no-console: 0 */

import TurbolinksAdapter from 'vue-turbolinks'
import Vue from 'vue/dist/vue.esm'
import draggable from 'vuedraggable'
import axios from 'axios'
import list from './components/list'

Vue.use(TurbolinksAdapter)

document.addEventListener('turbolinks:load', () => {
  axios.defaults.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

  const app = new Vue({
    el: '#app',
    data: () => {
      return {
        boardId: "5e9c292318338d0f425fa0fb",
        card: null,
        boardTitle: null,
        lists: []
      }
    },
    mounted () {
      axios
        .get(`/api/boards/${this.boardId}`)
        .then(response => (
          this.boardTitle = response.data.title,
          this.lists = response.data.lists,
          console.log(this.lists)
        ))
    },
    methods: {
      //edit board
      updateBoard() {
        console.log(this.boardId)
        axios
          .patch(`/api/boards/${this.boardId}`, {
            title: this.boardTitle,
          })
          .then(response => (
            console.log(response)
          ))
      }
    },
    components: {
      draggable,
      list
    }
  })
})
