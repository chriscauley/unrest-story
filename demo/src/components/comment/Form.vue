<template>
  <form @submit.prevent="submit">
    <label>
      <div>Username</div>
      <input v-model="username" :class="css.input" />
    </label>
    <label>
      <div>Content</div>
      <textarea v-model="text" :class="css.input" />
    </label>
    <button :class="css.button">Save</button>
  </form>
</template>

<script>
import store from '@/store'

const css = {
  input: 'border mb-2 w-full',
  button: 'p-2 border-gray-200 border rounded block'
}

export default {
  data() {
    return { text: '', username: '', css }
  },
  methods: {
    submit() {
      const { text, username } = this
      store.comment.add({ text, username })
      this.text = this.username = ''
    }
  }
}
</script>
