<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Add/Edit Book</h1>
        <hr />
        <form-tag @bookEditEvent="submitHandler" name="bookForm" event="bookEditEvent">
          <div v-if="book.slug !== ''" class="mb-3">
            <img :src="`${imgPath}/covers/${book.slug}.jpg`" class="img-fluid img-thumbnail book-cover" />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Cover Image</label>
            <input
              v-if="book.id === 0"
              ref="coverInput"
              class="form-control"
              type="file"
              id="formFile"
              required
              accept="image/jpeg"
              @change="loadCoverImage"
            />
            <input
              v-else
              ref="coverInput"
              class="form-control"
              type="file"
              id="formFile"
              accept="image/jpeg"
              @change="loadCoverImage"
            />

            <text-input
              v-model="book.title"
              type="text"
              required="true"
              label="Title"
              :value="book.title"
              name="title"
            />
            <select-input name="author-id" v-model="book.author_id" :items="authors" required label="Author" />
            <text-input
              v-model="book.publication_year"
              type="number"
              required="true"
              label="Publication Year"
              :value="book.publication_year"
              name="Publication Year"
            />

            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea required v-model="book.description" class="form-control" id="description" rows="3" />
            </div>

            <div class="mb-3">
              <label for="genres" class="form-label">Genres</label>
              <select class="form-select" ref="genres" id="genres" required size="7" v-model="book.genre_ids" multiple>
                <option v-for="genre in genres" :key="genre.value" :value="genre.value">{{ genre.text }}</option>
              </select>
            </div>
          </div>
          <hr />

          <div class="float-start">
            <input type="submit" class="btn btn-primary me-2" value="Save" />
            <router-link to="/admin/books" class="btn btn-outline-secondary me-2">Cancel</router-link>
          </div>
          <div class="float-end">
            <a v-if="book.id !== 0" class="btn btn-danger" href="javascript:void(0);" @click="confirmDelete(book.id)">
              Delete
            </a>
          </div>
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import routeSecurity from "../../router/routeSecurity";
import FormTag from "../forms/FormTag.vue";
import SelectInput from "../forms/SelectInput.vue";
import TextInput from "../forms/TextInput.vue";
import { store } from "../store";
import notie from "notie";
import router from "@/router";

export default {
  components: { FormTag, TextInput, SelectInput },
  name: "BookEdit",
  data() {
    return {
      book: {
        id: 0,
        title: "",
        author_id: 0,
        publication_year: null,
        description: "",
        cover: "",
        slug: "",
        genres: [],
        genre_ids: [],
      },
      authors: [],
      imgPath: process.env.VUE_APP_IMAGE_URL,
      genres: [
        { value: 1, text: "Science Fiction" },
        { value: 2, text: "Fantasy" },
        { value: 3, text: "Romance" },
        { value: 4, text: "Thriller" },
        { value: 5, text: "Mystery" },
        { value: 6, text: "Horror" },
        { value: 7, text: "Classic" },
      ],
    };
  },
  methods: {
    async submitHandler() {
      try {
        const payload = {
          id: this.book.id,
          title: this.book.title,
          author_id: +this.book.author_id,
          publication_year: +this.book.publication_year,
          description: this.book.description,
          cover: this.book.cover,
          slug: this.book.slug,
          genres: this.book.genres,
          genre_ids: this.book.genre_ids,
        };

        const book = await axios.post(`${process.env.VUE_APP_API_URL}/api/admin/books/save`, payload, {
          headers: { Authorization: `Bearer ${store.token}` },
        });

        if (book.data.error) {
          notie.alert({
            type: "error",
            text: book.data.message,
          });
        } else {
          notie.alert({
            type: "success",
            text: "changes saved",
          });
          router.push("/admin/books");
        }
      } catch (error) {
        notie.alert({
          type: "error",
          text: error.message,
        });
      }
    },
    loadCoverImage() {
      const file = this.$refs.coverInput.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        this.book.cover = base64String;
      };
      reader.readAsDataURL(file);
    },
    confirmDelete(id) {
      notie.confirm({
        text: "Are you sure you want to delete this book?",
        submitText: "Delete",
        submitCallback: async function () {
          const response = await axios.post(
            `${process.env.VUE_APP_API_URL}/api/admin/books/delete`,
            { id },
            { headers: { Authorization: `Bearer ${store.token}` } }
          );

          if (response.data.error) {
            notie.alert({
              type: "error",
              text: response.data.message,
            });
          } else {
            notie.alert({
              type: "success",
              text: "Book deleted",
            });
            router.push("/admin/books");
          }
        },
      });
    },
  },
  async beforeMount() {
    routeSecurity();
    if (+this.$route.params.bookId !== 0) {
      try {
        const response = await axios.post(
          process.env.VUE_APP_API_URL + "/api/admin/books/" + this.$route.params.bookId,
          {},
          { headers: { Authorization: "Bearer " + store.token } }
        );
        if (response.data.error) {
          notie.alert({
            type: "error",
            text: response.data.message,
          });
        } else {
          const book = response.data.data;
          let genreArray = [];
          for (let i = 0; i < book.genres.length; i++) {
            genreArray.push(book.genres[i].id);
          }
          book.genre_ids = genreArray;
          this.book = book;
        }
      } catch (error) {
        notie.alert({
          type: "error",
          text: error.message,
        });
      }
    }

    try {
      const response = await axios.post(
        process.env.VUE_APP_API_URL + "/api/admin/authors",
        {},
        { headers: { Authorization: "Bearer " + store.token } }
      );
      if (response.data.error) {
        notie.alert({
          type: "error",
          text: response.data.message,
        });
      } else {
        this.authors = response.data.data;
        // this.ready = true; TODO: add loading state
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
.book-cover {
  max-width: 10em;
}
</style>
