<template>
<ul class="comment-list__list">
  <li v-for="comment in comments" :key="comment.id">
    <div class="comment-list__top">
      <div class="comment-list__username">{{comment.username}} said:</div>
      <div v-if="comment.likes">{{ comment.likes }} likes</div>
    </div>
    <div class="comment-list__text">{{comment.text}}</div>
    <div class="comment-list__actions">
      <div class="comment-list__action" @click="like(comment)">Like</div>
      <div class="comment-list__action" @click="dislike(comment)">Dislike</div>
      <div class="flex-grow" />
      <div class="comment-list__action" @click="delete_(comment)">Delete</div>
    </div>
  </li>
</ul>
</template>

<script>
import store from '@/store'
import uS from '@unrest/story'

export default {
  computed: {
    comments: store.comment.all
  },
  methods: {
    like: uS.wrap('action.like', store.comment.like),
    dislike: uS.wrap('action.dislike', store.comment.dislike),
    delete_: uS.wrap('action.delete', store.comment.delete),
  }
}
</script>