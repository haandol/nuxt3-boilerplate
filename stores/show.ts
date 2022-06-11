import { defineStore } from 'pinia'

interface Show {
  show: {
    id: number
    url: string
    name: string
    type: string
    language: string
    image: {
      medium: string
    }
    summary: string
  }
}

export const useShowStore = defineStore('show', {
  state: () => ({
    showId: '',
    shows: [],
  }),
  getters: {
    show(): Show {
      return this.shows.find((show) => show.id === this.showId)
    },
  },
  actions: {
    async fetchShows(query: string) {
      const resp = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)
      const data: Show[] = await resp.json()
      this.shows = data
    },
  },
})
