<script setup>
  import NavBar from './components/NavBar.vue'
  import Footer from './components/Footer.vue'
  import { storeToRefs } from 'pinia';
  import { usePokemonsStore } from './store/modules/pokemon';

  
  const pokemonStore = usePokemonsStore();
  const { pokemons } = storeToRefs(pokemonStore);
  pokemonStore.morePokemons(0);
  pokemonStore.getPokemon('ditto');
</script>

<template>
  <header>
    <NavBar text="menu" />
  </header>

  <main>
        <ul v-if="pokemons.length">
            <li v-for="pokemon in pokemons" :key="pokemon.id">{{pokemon.item.name}}</li>
        </ul>
  </main>

  <footer>
     <Footer text="footer" />
  </footer>
</template>

<style scoped>
</style>
