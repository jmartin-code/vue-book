<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row" v-if="ready">
      <div class="col-md-2">
        <img class="img-fluid img-thumbnail" :src="`${imgPath}/covers/${book.slug}.jpg`" />
      </div>
      <div class="col-md-10">
        <h3 class="mt-3">{{ book.title }}</h3>
        <hr />
        <p>
          <strong>Author:</strong>
          {{ book.author.author_name }}
          <br />
          <strong>Published:</strong>
          {{ book.publication_year }}
          <br />
        </p>
        <p>
          {{ book.description }}
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notie from "notie";

export default {
  data() {
    return {
      book: {},
      imgPath: process.env.VUE_APP_IMAGE_URL,
      ready: false,
    };
  },
  async created() {
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL + "/api/books/" + this.$route.params.bookName);
      if (response.data.error) {
        notie.alert({
          type: "error",
          text: response.data.message,
        });
      } else {
        this.book = response.data.data.book;
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
