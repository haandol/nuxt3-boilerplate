import { defineStore } from 'pinia'
import { useShowStore } from './show'

interface Episode {
  id: number
  url: string
  season: number
  number: number
  name: string
  type: string
  image: {
    medium: string
  }
  language: string
  rating: {
    average: number
  }
}

export const useEpisodeStore = defineStore('episodes', {
  state: () => ({
    episodes: [] as Episode[],
  }),
  getters: {
    showId(): string {
      return useShowStore().showId
    },
  },
  actions: {
    async fetchEpisodes() {
      const resp = await fetch(`https://api.tvmaze.com/shows/${this.showId}/episodes`)
      const data: Episode[] = await resp.json()
      this.episodes = data
    },
  },
})
