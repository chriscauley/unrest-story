<template>
  <div class="app-content">
    <div class="comment-card card">
      <div class="card-body">
        {{ comment_count }} comments
        <comment-list v-if="comment_count" />
        <comment-form />
      </div>
    </div>
    <story-card />
  </div>
</template>

<script>
import CommentForm from '@/components/comment/Form'
import CommentList from '@/components/comment/List'
import story, { StoryCard } from '@unrest/story'
import store from '@/store'
import stories from '@/stories.yaml'

story.register(stories)

export default {
  components: { CommentForm, CommentList, StoryCard },
  name: 'App',
  computed: {
    comment_count: () => store.comment.all().length
  }
}
</script>