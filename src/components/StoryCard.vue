<template>
  <div class="unrest-story">
    <div class="unrest-floating-actions">
      <div class="unrest-story__toggle">
        <button :class="show_list_btn" @click="showDidList()">
          <i class="fa fa-ellipsis-h" />
        </button>
        <button class="btn -primary" @click="toggle">
          <i class="fa fa-book mr-2" />
          {{ stats.completed }} / {{ stats.total }}
        </button>
        <div class="unrest-story__short-list list-group">
          <div v-for="key in visible_did_list" class="list-group-item" :key="key">{{ key }}</div>
        </div>
      </div>
    </div>
    <div :class="css.modal.outer()" v-if="open">
      <div :class="css.modal.mask()" @click="toggle" />
      <div :class="css.modal.content.fullscreen()">
        <h4>User Stories</h4>
        <div>
          <story-tree v-for="(branch, slug) in tree" :branch="branch" :slug="slug" :key="slug" />
          <button role="button" @click="reset" :class="css.button()">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import css from '@unrest/css'

import StoryTree from './Tree.vue'
import store from '../store'

export default {
  components: { StoryTree },
  data() {
    return { css, open: false, show_did_list: 0, timeout: null }
  },
  computed: {
    visible_did_list() {
      return this.did_list
        .slice()
        .reverse()
        .slice(0, this.show_did_list)
    },
    did_list() {
      return store.state.did_list
    },
    show_list_btn() {
      return ['btn', this.show_did_list ? '-secondary' : '-primary']
    },
    stats() {
      return {
        total: store.state.keys.length,
        completed: Object.values(store.state.did).filter(Boolean).length,
      }
    },
    tree() {
      return store.state.tree
    },
  },
  watch: {
    'did_list.length': function(_new, old) {
      this.showDidList(this.show_did_list + _new - old)
    },
  },
  methods: {
    showDidList(n) {
      this.show_did_list = n === undefined ? this.did_list.length : n
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => (this.show_did_list = 0), 10000)
    },
    toggle() {
      this.open = !this.open
    },
    reset: store.reset,
  },
}
</script>
