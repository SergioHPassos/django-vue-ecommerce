<template>
  <div class="home">
    <!-- <section class="hero is-medium is-dark mb-6">
      <div class="hero-body has-text-centered">
        <p class="title mb-6">Welcome To HerlanderArt</p>
        <p class="subtitle">Custome Wood Furnature/Accessories</p>
      </div>
    </section> -->

    <!-- list products -->
    <div class="columns is-multiline">
      <div class="column is-12">
        <h2 class="is-size-2 has-text-centered">Latest Products</h2>
      </div>

      <!-- lists items start -->
      <ProductBox
        v-for="product in latestProducts"
        v-bind:key="product.id"
        v-bind:product="product"
      />
      <!-- lists items end -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ProductBox from '@/components/ProductBox';

// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      latestProducts: [],
    };
  },
  components: {
    ProductBox,
  },
  mounted() {
    this.getLatestProducts();

    // set title
    document.title = 'Home | HerlanderArt';
  },
  methods: {
    async getLatestProducts() {
      this.$store.commit('setIsLoading', true);

      await axios
        .get('/api/v1/latest-products/')
        .then((response) => {
          this.latestProducts = response.data;
        })
        .catch((error) => {
          console.log(error);
        });

      this.$store.commit('setIsLoading', false);
    },
  },
};
</script>
