<template>
  <div>
    <div style="max-width: 300px;" class="mt-16 m-auto p-2 rounded shadow bg-white">
      {{ comment_count }} comments
      <comment-list />
      <comment-form />
    </div>
    <story-card />
  </div>
</template>

<script>
import CommentForm from '@/components/comment/Form'
import CommentList from '@/components/comment/List'
import { StoryCard } from '@unrest/story'
import store from '@/store'

export default {
  components: { CommentForm, CommentList, StoryCard },
  name: 'App',
  computed: {
    comment_count: () => store.comment.all().length
  }
}
</script>