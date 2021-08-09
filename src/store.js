import { reactive } from 'vue'
import { startCase, set } from 'lodash'

const initial_state = {
  stories: {},
  byKey: {},
  did: {},
  keys: [],
  count: 0,
  tree: {},
}

let save = () => {}
let reset = () => {}

const LS_KEY = '@unrest/story'

if (typeof localStorage !== undefined) {
  try {
    const did = JSON.parse(localStorage.getItem(LS_KEY) || '{}')
    initial_state.did = did
    save = () => localStorage.setItem(LS_KEY, JSON.stringify(state.did))
    reset = () => localStorage.removeItem(LS_KEY)
  } catch (_e) {
    console.warn('Unable to load @unrest/story history error will be logged below')
    console.error(_e)
  }
}

const state = reactive(initial_state)

const doStory = (key) => {
  if (!state.byKey[key]) {
    throw 'Unregistered story: ' + key
  }
  state.did[key]++
  save()
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
    state.did[key] = state.did[key] || 0
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
  reset,
  wrap(name, func) {
    return function() {
      doStory(name)
      return func(...arguments)
    }
  },
}
