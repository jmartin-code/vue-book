<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">Manage Books</h1>
      </div>
    </div>
  </div>
</template>

<script>
import routeSecurity from "../../router/routeSecurity";

export default {
  name: "BooksAdmin",
  beforeMount() {
    routeSecurity();
  },
};
</script>
