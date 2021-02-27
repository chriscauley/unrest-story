<template>
<ul :class="css.list">
  <li v-for="comment in comments" :key="comment.id">
    <div :class="css.top">
      <div :class="css.username">{{comment.username}} said:</div>
      <div v-if="comment.likes">{{ comment.likes }} likes</div>
    </div>
    <div :class="css.text">{{comment.text}}</div>
    <div :class="css.actions">
      <div :class="css.action" @click="like(comment)">Like</div>
      <div :class="css.action" @click="dislike(comment)">Dislike</div>
      <div class="flex-grow" />
      <div :class="css.action" @click="delete_(comment)">Delete</div>
    </div>
  </li>
</ul>
</template>

<script>
import store from '@/store'
// import uS from '@unrest/story'

const css = {
  list: 'mb-8',
  top: 'flex justify-between text-sm',
  text: 'py-2 px-4 rounded border',
  username: 'text-gray-400',
  actions: 'flex justify-between select-none',
  action: 'underline cursor-pointer mr-2 text-sm text-blue-400'
}

export default {
  data() {
    return { css }
  },
  mounted() {
    // ['like', 'dislike', 'delete_'].forEach(key => {
    //   this[key] = uS.Story(key, this[key])
    // })
  },
  computed: {
    comments: store.comment.all
  },
  methods: {
    like: store.comment.like,
    dislike: store.comment.dislike,
    delete_: store.comment.delete,
  }
}
</script>