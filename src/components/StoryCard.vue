<template>
  <div class="unrest-story">
    <div class="unrest-floating-actions">
      <button class="btn -primary" @click="toggle">
        <i class="fa fa-book mr-2" />
        {{ stats.completed }} / {{ stats.total }}
      </button>
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
    return { css, open: false }
  },
  computed: {
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
  methods: {
    toggle() {
      this.open = !this.open
    },
    reset: store.reset,
  },
}
</script>
