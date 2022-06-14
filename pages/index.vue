<template>
  <div class="grid">
    <div class="grid grid-cols-1 gap-4">
      <input
        v-model="query"
        type="text"
        class="w-full"
        placeholder="Search..."
      />
      <button @click="searchShow">Search</button>
    </div>
    <div
      class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6"
    >
      <div v-for="show in shows" :key="show.show.id" class="show">
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
import { storeToRefs } from 'pinia'
import { useShowStore } from '@/stores/show'
import { useSearchStore } from '@/stores/search'
const showStore = useShowStore()
const searchStore = useSearchStore()

const { query } = storeToRefs(searchStore)
const { shows } = storeToRefs(showStore)

async function searchShow() {
  await showStore.fetchShows()
}
</script>
