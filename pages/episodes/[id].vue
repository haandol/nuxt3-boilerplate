<template>
  <div class="grid">
    <div class="grid grid-cols-1 gap-4">
      <div>
        <NuxtLink to="/">Back to main</NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">
      <div
        v-for="episode in episodes"
        :key="episode.id"
        class="episode"
      >
        <div>
          {{ episode.name }}
        </div>
        <p>Season: {{ episode.season }} Episode: {{ episode.number }}</p>
        <img
          :src="episode.image?.medium"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { storeToRefs } from 'pinia'
import { useEpisodeStore } from '@/stores/episode'
import { useShowStore } from '@/stores/show'
const route = useRoute()
const showStore = useShowStore()
const episodeStore = useEpisodeStore()

showStore.showId = route.params.id as string

const { episodes } = storeToRefs(episodeStore)
await episodeStore.fetchEpisodes()
</script>

<style lang="scss">
.episode {
  div {
    &:first-child {
      font-style: italic;
      color: red;
    }
  }
}
</style>
