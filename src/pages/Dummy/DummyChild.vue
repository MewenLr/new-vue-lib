<template>
  <div class="fake-child">
    Dummy Child component
    <br>
    <ul
      class="fake-child__list"
      v-if="success"
    >
      <li
        class="fake-child__item"
        :key="comment.id"
        v-for="comment in comments"
      >
        {{ comment }}
      </li>
    </ul>
    <div v-else-if="loading">
      ...loading
    </div>
    <div v-else-if="error">
      Error could not fetch api
    </div>
  </div>
</template>

<script lang="ts">
import { Comment } from '@/models'
import { defineComponent, inject, onBeforeMount, ref } from 'vue'
import CommentService, { CommentServiceSymbol } from '@/services/Comment/CommentService'
import useService from '@/modules/hooks/useService/useService'

export default defineComponent({
  name: 'DummyChild',
  setup() {
    const { success, error, loading, fetchApi } = useService()

    const comments = ref<Comment[]>([])
    const commentService = inject<CommentService>(CommentServiceSymbol)

    onBeforeMount(async () => {
      try {
        const data: Comment[] = await fetchApi(commentService?.getComments())
        comments.value = data
      } catch (err) {
        console.error(err)
      }
    })

    return {
      error,
      success,
      loading,
      comments,
    }
  },
})
</script>

<style>
.dummy-child {
}
</style>
