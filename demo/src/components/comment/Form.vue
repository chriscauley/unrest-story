<template>
  <form @submit.prevent="submit" class="comment-form">
    <label>
      <div>Username</div>
      <input v-model="username" class="comment-form__input" />
    </label>
    <label>
      <div>Comment</div>
      <textarea v-model="text" class="comment-form__input" />
    </label>
    <div v-if="error" class="comment-form__error">
      {{ error }}
    </div>
    <button class="comment-form__button">Save</button>
  </form>
</template>

<script>
import store from '@/store'
import uS from '@unrest/story'

export default {
  data() {
    return { text: '', username: '', error: null }
  },
  methods: {
    submit() {
      const { text, username } = this
      this.error = null
      if (!text || !username) {
        this.error = 'You must specify both a username and a comment'
        uS.doStory('addComment.error')
      } else {
        store.comment.add({ text, username })
        this.text = this.username = ''
        uS.doStory('addComment.success')
      }
    }
  }
}
</script>
