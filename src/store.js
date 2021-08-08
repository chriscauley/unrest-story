import { reactive } from 'vue'
import { startCase, set } from 'lodash'

const state = reactive({
  stories: {},
  byKey: {},
  did: {},
  keys: [],
  count: 0,
  tree: {},
})

const doStory = (key) => {
  if (!state.byKey[key]) {
    throw 'Unregistered story: ' + key
  }
  state.did[key]++
}

const register = (obj, path = []) => {
  if (Array.isArray(obj)) {
    obj.map((o) => register(o, [...path]))
  } else if (typeof obj === 'string') {
    const slug = obj
    path = [...path, slug]
    const key = path.join('.')
    if (state.byKey[key]) {
      // already registered (usually just hmr acting up)
      return
    }
    const name = startCase(slug)
    obj = { slug, key, name, path, __is_leaf: true }
    state.keys.push(key)
    state.byKey[key] = obj
    state.did[key] = 0
    set(state.tree, obj.path, obj)
  } else {
    Object.entries(obj).forEach(([key, value]) => {
      register(value, [...path, key])
    })
  }
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
