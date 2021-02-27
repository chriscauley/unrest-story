import { reactive } from 'vue';

let ID_COUNTER = 0

const state = reactive({
  list: [],
})

const add = ({text, username}) => state.list.push({
  text,
  username,
  id: ID_COUNTER++,
  likes: 0,
})

export default {
  all: () => state.list.slice(),
  like: (comment) => comment.likes ++,
  dislike: (comment) => comment.likes --,
  delete: (comment) => state.list = state.list.filter(c => c !== comment),
  add,
}