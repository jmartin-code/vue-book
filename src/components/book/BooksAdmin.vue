<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Manage Books</h1>
        <hr />
        <table v-if="ready" class="table table-stripped table-compact">
          <thead>
            <tr>
              <th>Book</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>
                <router-link :to="`/admin/books/${book.id}`">{{ book.title }}</router-link>
              </td>
              <td>
                {{ book.author.author_name }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import routeSecurity from "../../router/routeSecurity";
import axios from "axios";
import notie from "notie";

export default {
  name: "BooksAdmin",
  data() {
    return {
      books: [],
      ready: false,
    };
  },
  async beforeMount() {
    routeSecurity();
    try {
      const response = await axios.get(process.env.VUE_APP_API_URL + "/api/books");
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
