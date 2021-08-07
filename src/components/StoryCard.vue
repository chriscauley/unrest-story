<template>
  <div class="story-card">
    <div :class="css.story_card.trigger" @click="toggle">
      <i class="fa fa-book mr-2" />
      {{ stats.completed }} / {{ stats.total }}
    </div>
    <div :class="css.modal.outer()" v-if="open">
      <div :class="css.modal.mask()" @click="toggle" />
      <div :class="css.modal.content.fullscreen()">
        <h4>User Stories</h4>
        <ul>
          <li v-for="story in stories" :class="story.css.li" :key="story.key">
            <i :class="story.css.icon" />
            {{ story.name }}
            <span v-if="story.count > 1">x{{ story.count }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import css from '@unrest/css'

import store from '../store'

css.story_card = {
  trigger: 'fixed bottom-0 left-0 m-4 bg-white rounded shadow flex items-center justify-center p-2',
}

export default {
  data() {
    return { css, open: false }
  },
  computed: {
    stats() {
      return {
        total: store.state.slugs.length,
        completed: Object.values(store.state.did).filter(Boolean).length,
      }
    },
    stories() {
      const { slugs, bySlug, did } = store.state
      return slugs.map((slug) => {
        const count = did[slug]
        const story = bySlug[slug]
        const color = count ? 'green' : 'red'
        return {
          ...story,
          count,
          css: {
            icon: `fa fa-${count ? 'check' : 'times-circle'} text-${color}-900 mr-2`,
            li: `rounded mb-2`,
          },
        }
      })
    },
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>
