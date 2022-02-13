<template>
  <div class="page-product">
    <div class="columns is-multiline">
      <!-- product image/description start -->
      <div class="column is-7">
        <figure class="image mb-6">
          <img v-bind:src="product.get_image" />
        </figure>

        <h1 class="title">{{ product.name }}</h1>
        <p>{{ product.description }}</p>
      </div>
      <!-- product image/description end -->

      <!-- product information start -->
      <div class="column is-4">
        <h2 class="subtitle">Information</h2>

        <p><strong>Price: </strong>${{ product.price }}</p>

        <div class="field has-addons mt-6">
          <div class="control">
            <input type="number" class="input" min="1" v-model="quantity" />
          </div>

          <div class="control">
            <a class="button is-dark" @click="addToCart">Add To Cart</a>
          </div>
        </div>
      </div>
      <!-- product information end -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'bulma-toast';

export default {
  name: 'Product',
  data() {
    return {
      product: {},
      quantity: 1,
    };
  },
  mounted() {
    this.getProduct();
  },
  methods: {
    async getProduct() {
      this.$store.commit('setIsLoading', true);

      const category_slug = this.$route.params.category_slug;
      const product_slug = this.$route.params.product_slug;

      await axios
        .get(`/api/v1/products/${category_slug}/${product_slug}`)
        .then((response) => {
          this.product = response.data;

          document.title = this.product.name + ' | HerlanderArt';
        })
        .catch((error) => {
          console.log(error);
        });

      // await axios must finish before loading is done
      this.$store.commit('setIsLoading', false);
    },
    addToCart() {
      // ensure quanitity is 1, security
      if (isNaN(this.quantity) || this.quantity < 1) {
        this.quantity = 1;
      }

      // get item details
      const item = {
        product: this.product,
        quantity: this.quantity,
      };

      // add to cart file
      this.$store.commit('addToCart', item);

      // popup alert for item being added to the cart
      toast({
        message: 'The product was added to the cart',
        type: 'is-success',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      });
    },
  },
};
</script>
