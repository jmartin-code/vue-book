<template>
  <MainHeader />
  <div>
    <router-view :key="componentKey" @forceUpdate="forceUpdate" />
  </div>
  <MainFooter />
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import MainFooter from "./components/MainFooter.vue";
import { store } from "./components/store";
// import axios from "axios";

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
      componentKey: 0,
    };
  },
  methods: {
    forceUpdate() {
      this.componentKey += 1;
    },
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
  async mounted() {
    // const payload = {
    //   foo: "bar",
    // };
    // console.log("mounted");
    // const response = await axios.post(
    //   "http://localhost:8081/api/admin/foo",
    //   payload,
    //   {
    //     headers: {
    //       Authorization: "Bearer " + store.token,
    //     },
    //   }
    // );
    // console.log(response.data);
  },
};
</script>

<style></style>
