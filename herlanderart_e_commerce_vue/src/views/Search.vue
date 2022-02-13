<template>
  <div class="page-search">
    <div class="columns is-multiline">
      <div class="column is-12">
        <h1 class="title">Search</h1>
        <h2 class="is-size-5 has-text-grey">Search term: "{{ query }}"</h2>
      </div>

      <ProductBox
        v-for="product in products"
        v-bind:key="product.id"
        v-bind:product="product"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox';
import { toast } from 'bulma-toast';

export default {
  name: 'Search',
  components: {
    ProductBox,
  },
  data() {
    return {
      products: [],
      query: '',
    };
  },
  mounted() {
    // update title
    document.title = 'Search | HerlanderArt';

    // get address bar data
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);

    // query has value
    if (params.get('query')) {
      this.query = params.get('query');

      // call backend for products based on query
      this.performSearch();
    }
  },
  methods: {
    async performSearch() {
      // start loading
      this.$store.commit('setIsLoading', true);

      // api call
      await axios
        .post('/api/v1/products/search/', { query: this.query })
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
  },
};
</script>
