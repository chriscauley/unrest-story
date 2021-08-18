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

const LS_KEY = '@unrest/story'

let ls = {
  getItem: (key) => ls._cache[key] || null,
  setItem: (key, value) => (ls._cache[key] = value),
  _cache: {},
}

if (typeof localStorage !== undefined) {
  ls = localStorage
}

const save = () => ls.setItem(LS_KEY, JSON.stringify(state.did))
const reset = () => {
  state.did = {}
  save()
}

try {
  initial_state.did = JSON.parse(ls.getItem(LS_KEY) || '{}')
} catch (_e) {
  console.warn('Unable to load @unrest/story history error will be logged below')
  console.error(_e)
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

const doOnce = (action, value) => {
  const once_key = `${LS_KEY}/__once`
  const record = JSON.parse(ls.getItem(once_key) || '{}')
  if (!action || record[action] === value) {
    return
  }
  record[action] = value
  ls.setItem(once_key, JSON.stringify(record))
  doStory(action)
}

export default {
  state,
  doStory,
  doOnce,
  register,
  reset,
  wrap(name, func) {
    return function() {
      doStory(name)
      return func(...arguments)
    }
  },
}
