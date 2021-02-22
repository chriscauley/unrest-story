<template>
  <div style="max-width: 300px;" class="mt-16 m-auto">
    {{ comment_count }} comments
    <comment-list />
    <comment-form />
  </div>
</template>

<script>
import CommentForm from '@/components/comment/Form'
import CommentList from '@/components/comment/List'
import store from '@/store'

export default {
  components: { CommentForm, CommentList },
  name: 'App',
  computed: {
    comment_count: () => store.comment.all().length
  }
}
</script>
