import { reactive } from 'vue'
import { startCase } from 'lodash'

const state = reactive({
  stories: {},
  bySlug: {},
  did: {},
  slugs: [],
  count: 0,
})

const doStory = (slug) => {
  if (!state.bySlug[slug]) {
    throw 'Unregistered story: ' + slug
  }
  state.did[slug] = state.did[slug] + 1
}

const register = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(register)
  }
  if (typeof obj === 'string') {
    obj = { slug: obj }
  }
  obj = {
    name: startCase(obj.slug),
    ...obj, // TODO deep clone?
  }
  state.slugs.push(obj.slug)
  state.bySlug[obj.slug] = obj
  state.did[obj.slug] = 0
  return obj
}

export default {
  state,
  doStory,
  register,
  wrap(name, func) {
    return function() {
      doStory(name)
      return func(...arguments)
    }
  },
}
