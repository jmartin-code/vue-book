<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">User Edit</h1>
        <hr />
        <form-tag
          @userEditEvent="submitHandler"
          name="userform"
          event="userEditEvent"
        >
          <text-input
            v-model="user.first_name"
            type="text"
            required="true"
            label="First Name"
            :value="user.first_name"
            name="first_name"
          ></text-input>
          <text-input
            v-model="user.last_name"
            type="text"
            required="true"
            label="Last Name"
            :value="user.last_name"
            name="last_name"
          ></text-input>
          <text-input
            v-model="user.email"
            type="text"
            required="true"
            label="Email"
            :value="user.email"
            name="email"
          ></text-input>

          <text-input
            v-if="!user.id"
            v-model="user.password"
            type="text"
            required="true"
            label="Password"
            :value="user.password"
            name="password"
          ></text-input>

          <text-input
            v-else
            v-model="user.password"
            type="text"
            label="Password"
            :value="user.password"
            name="password"
          ></text-input>

          <hr />

          <div class="float-start">
            <input class="btn btn-primary me-2" value="Save" type="submit" />
            <router-link to="/admin/users" class="btn btn-outline-secondary"
              >Cancel</router-link
            >
          </div>

          <div class="float-end">
            <a
              v-if="
                this.$route.params.userId &&
                this.$route.params.userId !== store.user.id
              "
              class="btn btn-danger"
              href="javascript:void(0)"
              @click="confirmDelete(this.user.id)"
              >Delete</a
            >
          </div>
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import routeSecurity from "../../router/routeSecurity";
import FormTag from "../forms/FormTag.vue";
import TextInput from "../forms/TextInput.vue";
import notie from "notie";
import axios from "axios";
import { store } from "../store";

export default {
  name: "UserEdit",
  components: {
    TextInput,
    FormTag,
  },
  data() {
    return {
      user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submitHandler() {
      try {
        const payload = {
          id: +this.$route.params.userId,
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email: this.user.email,
          password: this.user.password,
        };

        const user = await axios.post(
          `${process.env.VUE_APP_API_URL}/api/admin/users/save`,
          payload,
          { headers: { Authorization: `Bearer ${store.token}` } }
        );

        if (user.data.error) {
          notie.alert({
            type: "error",
            text: user.data.message,
          });
        } else {
          notie.alert({
            type: "success",
            text: "changes saved",
          });
        }
      } catch (error) {
        notie.alert({
          type: "error",
          text: error.message,
        });
      }
    },
  },
  beforeMount() {
    routeSecurity();

    const id = +this.$route.params.userId;
    if (id) {
      //Editing user
    }
  },
};
</script>
