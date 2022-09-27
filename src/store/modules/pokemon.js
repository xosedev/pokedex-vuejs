import {
    defineStore
} from 'pinia'
import axios from 'axios';

export const usePokemonsStore = defineStore({
    id: 'pokemons',
    state: () => ({
        pokemons: [],
        pokemon: null,
        isLoading: false,
    }),
    actions: {
        async morePokemons(page) {
            this.$state.loading = true
            const offset = page
            const responseArray = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
            const responseJson = await responseArray.json()
            const pokemonsMap = responseJson.results.map(async (item) => {
                const responseItem = await fetch(item.url)
                const info = await responseItem.json()
                return {
                    item,
                    info
                }
            })
            const pokemons = await Promise.all(pokemonsMap)
            this.$state.isLoading = false
            this.$state.pokemons = [
                ...pokemons,
                ...this.$state.pokemons,
            ]
        },


        async pokemon(name) {
            this.$state.loading = true
            const responseArray = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const responseJson = await responseArray.json()
           console.log(responseJson);
            this.$state.isLoading = false
            this.$state.pokemon = responseJson
        },
    },
    getters: {
        getPokemons(state) {
            return state.pokemons
        },
        getPokemon(state) {
            return state.pokemon
        },
        isLoading(state) {
            return state.loading
        },
    },
})