<template>
  <ul class="list-comments">
    <li
      class="list-comments__item"
      :key="comment.id"
      v-for="comment in data"
    >
      {{ comment }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Comment } from '@/models'
import { defineComponent, inject } from 'vue'
import CommentService, { CommentServiceSymbol } from '@/services/Comment/CommentService'
import useService from '@/modules/hooks/useService/useService'

export default defineComponent({
  name: 'ListComments',
  async setup () {
    const commentService = inject<CommentService>(CommentServiceSymbol)

    const { fetchApi } = useService()

    const data: Comment[] = await fetchApi(commentService?.getComments())

    return {
      data,
    }
  }
})
</script>
