<template>
  <div class="unrest-story__branch">
    <div v-if="branch.__is_leaf"><i :class="icon" /> {{ branch.name }}</div>
    <div v-else>
      {{ name }}
      <story-tree
        class="unrest-story__child"
        v-for="(child, child_slug) in branch"
        :key="child_slug"
        :branch="child"
        :slug="child_slug"
      />
    </div>
  </div>
</template>

<script>
import store from '../store'
import { startCase } from 'lodash'

export default {
  name: 'StoryTree',
  props: {
    level: {
      type: Number,
      default: () => 0,
    },
    branch: Object,
    slug: String,
  },
  computed: {
    name() {
      return startCase(this.slug)
    },
    icon() {
      const count = store.state.did[this.branch.key]
      const icon = count ? 'check' : 'times-circle'
      const color = count ? 'success' : 'danger'
      return `fa fa-${icon} text-${color}`
    },
  },
}
</script>
