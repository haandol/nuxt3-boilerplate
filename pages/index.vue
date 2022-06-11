<template>
  <div class="grid">
    <div class="grid grid-cols-1 gap-4">
      <input
        type="text"
        v-model="query"
        class="w-full"
        placeholder="Search..."
      />
      <button @click="searchShow">Search</button>
    </div>
    <div
      class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
    >
      <div v-for="show in shows" :key="show.show.id">
        <NuxtLink :to="`/episodes/${show.show.id}`">
          <p>{{ show.show.name }}</p>
          <img :src="show.show.image?.medium" alt="" />
          <div v-html="show.show.summary"></div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useShowStore } from '@/stores/show'
  const query = ref('')
  const store = useShowStore()
  const { shows } = storeToRefs(store)

  async function searchShow() {
    await store.fetchShows(query.value)
  }
</script>
