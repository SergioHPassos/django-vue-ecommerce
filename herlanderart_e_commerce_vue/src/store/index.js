import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  mutations: {
    //
    initializeStore(state) {
      // store cart details on clients local machine
      if (localStorage.getItem('cart')) {
        // if the file exist on the clients local computer than get load it
        state.cart = JSON.parse(localStorage.getItem('cart'));
      } else {
        // create cart file
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }

      // user authentication
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token');
        state.isAuthenticated = true;
      } else {
        state.token = '';
        state.isAuthenticated = false;
      }
    },
    addToCart(state, item) {
      // check if item already exist in cart
      const exists = state.cart.items.filter(
        (i) => i.product.id === item.product.id
      );

      // item is already in the cart
      if (exists.length) {
        exists[0].quantity =
          parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        // put item into cart
        state.cart.items.push(item);
      }

      // update cart file
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    setIsLoading(state, status) {
      // check if the client is still lading
      state.isLoading = status;
    },
    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },
    removeToken(state) {
      state.token = '';
      state.isAuthenticated = false;
    },
    clearCart(state) {
      state.cart = { items: [] };

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  actions: {},
  modules: {},
});
