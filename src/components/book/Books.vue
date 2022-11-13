<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Books</h1>
        <hr />
        <div class="filters text-center">
          <span class="filter me-1" :class="{ active: currentFilter === 0 }" @click="setFilter(0)">ALL</span>
          <span class="filter me-1" :class="{ active: currentFilter === 1 }" @click="setFilter(1)">
            SCIENCE FICTION
          </span>
          <span class="filter me-1" :class="{ active: currentFilter === 2 }" @click="setFilter(2)">FANTASY</span>
          <span class="filter me-1" :class="{ active: currentFilter === 4 }" @click="setFilter(4)">THRILLER</span>
          <span class="filter me-1" :class="{ active: currentFilter === 6 }" @click="setFilter(6)">HORROR</span>
          <span class="filter me-1" :class="{ active: currentFilter === 7 }" @click="setFilter(7)">CLASSIC</span>
        </div>
        <hr />
        <div>
          <div class="card-group">
            <transition-group class="p-3 d-flex flex-wrap" name="books" tag="div" appear>
              <div v-for="book in books" :key="book.id">
                <div
                  class="card me-2 ms-1 mb-3"
                  style="width: 10rem"
                  v-if="book.genre_ids.includes(currentFilter) || currentFilter === 0"
                >
                  <router-link :to="`/books/${book.slug}`">
                    <img :src="`${imgPath}/covers/${book.slug}.jpg`" class="card-img-top" />
                  </router-link>
                  <div class="card-body text-center">
                    <h6 class="card-title">{{ book.title }}</h6>
                    {{ book.author.author_name }}
                    <small v-for="(genre, index) in book.genres" :key="index">
                      <em>
                        {{ genre.genre_name }}
                        <span v-if="index !== book.genres.length - 1">-</span>
                      </em>
                    </small>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "./../store";
import axios from "axios";
import notie from "notie";

export default {
  data() {
    return {
      store,
      ready: false,
      imgPath: process.env.VUE_APP_IMAGE_URL,
      books: [],
      currentFilter: 0,
    };
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter;
    },
  },
  async beforeMount() {
    try {
      const response = await axios.get(
        process.env.VUE_APP_API_URL + "/api/books",
        {},
        { headers: { Authorization: "Bearer " + store.token } }
      );
      if (response.data.error) {
        notie.alert({
          type: "error",
          text: response.data.message,
        });
      } else {
        this.books = response.data.data.books;
        this.ready = true;
      }
    } catch (error) {
      notie.alert({
        type: "error",
        text: error.message,
      });
    }
  },
};
</script>

<style scoped>
.filter {
  padding: 6px;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.35s;
  border: 1px solid silver;
}

.filter.active {
  background: lightblue;
}

.filter:hover {
  background: lightgray;
}

/* transition group */
.books-move {
  transition: all 500ms ease-in-out 50ms;
}

.books-enter-active {
  transition: all 500ms ease-in-out;
}
.books-leave-active {
  transition: all 500ms ease-in;
}

.books-enter,
.books-leave-to {
  opacity: 0;
}
</style>
