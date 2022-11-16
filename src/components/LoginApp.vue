<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-5">Login</h1>
        <form-tag @myEvent="submitHandler" event="myEvent" name="myForm">
          <text-input v-model="email" label="Email" type="email" name="email" required="true"></text-input>

          <text-input v-model="password" label="Password" type="password" name="password" required="true"></text-input>
          <input type="submit" class="btn btn-primary" value="Login" />
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import FormTag from "./forms/FormTag.vue";
import TextInput from "./forms/TextInput.vue";
import axios from "axios";
import { store } from "./store";
import router from "./../router/index";
import notie from "notie";

export default {
  name: "LoginApp",
  components: {
    TextInput,
    FormTag,
  },
  data() {
    return {
      email: "",
      password: "",
      store,
    };
  },
  methods: {
    async submitHandler() {
      try {
        const payload = {
          email: this.email,
          password: this.password,
        };

        const response = await axios.post(process.env.VUE_APP_API_URL + "/api/login", payload);

        const data = response.data;
        store.token = data.data.token.token;
        store.user = {
          id: data.data.user.id,
          first_name: data.data.user.first_name,
          last_name: data.data.user.last_name,
          email: data.data.user.email,
        };

        //store cookie
        let date = new Date();
        let expDays = 1;
        date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
        const expires = "expires=" + date.toUTCString;

        // set cookie
        document.cookie =
          "_site_data=" + JSON.stringify(data.data) + ";" + expires + "; path=/; SameSite=strict; Secure;";

        router.push("/");
      } catch (error) {
        console.log(error);
        notie.alert({
          type: "error",
          text: error.response.data.message,
        });
      }
    },
  },
};
</script>
