<template>
  <form @submit.prevent="submit">
    <label>
      <div>Username</div>
      <input v-model="username" :class="css.input" />
    </label>
    <label>
      <div>Comment</div>
      <textarea v-model="text" :class="css.input" />
    </label>
    <div v-if="error" :class="css.err">
      {{ error }}
    </div>
    <button :class="css.button">Save</button>
  </form>
</template>

<script>
import store from '@/store'
// import uS from '@unrest/story'

const css = {
  input: 'border mb-2 w-full',
  button: 'p-2 border-gray-200 border rounded block',
  err: 'text-red-800 mb-2',
}

// uS.Story('add comment')
// uS.Story('invalid form')

export default {
  data() {
    return { text: '', username: '', css, error: null }
  },
  methods: {
    submit() {
      const { text, username } = this
      this.error = null
      if (!text || !username) {
        this.error = 'You must specify both a username and a comment'
        // uS.doStory('invalid form')
      } else {
        store.comment.add({ text, username })
        this.text = this.username = ''
        // uS.doStory('add comment')
      }
    }
  }
}
</script>
