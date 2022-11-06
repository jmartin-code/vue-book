<template>
  <MainHeader />
  <div>
    <router-view />
  </div>
  <MainFooter />
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import MainFooter from "./components/MainFooter.vue";
import { store } from "./components/store";

const getCookie = (name) => {
  return document.cookie.split(": ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

export default {
  name: "App",
  components: {
    MainHeader,
    MainFooter,
  },
  data() {
    return {
      store,
    };
  },
  beforeMount() {
    // check for cookie
    let data = getCookie("_site_data");

    if (data !== "") {
      let cookieData = JSON.parse(data);
      store.token = cookieData.token.token;
      store.user = {
        id: cookieData.user.id,
        first_name: cookieData.user.first_name,
        last_name: cookieData.user.last_name,
        email: cookieData.user.email,
      };
    }
  },
};
</script>

<style></style>
