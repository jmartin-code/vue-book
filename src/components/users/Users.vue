<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
        <hr />
        <table v-if="ready" class="table table-compact table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Stats</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <router-link :to="`/admin/users/${user.id}`">
                  {{ user.last_name }}, {{ user.first_name }}
                </router-link>
              </td>
              <td>{{ user.email }}</td>
              <td v-if="user.token.id">
                <span class="badge bg-success" @click="logUserOut(user.id)"
                  >Logged in</span
                >
              </td>
              <td v-else>
                <span class="badge bg-danger">Not logged in</span>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notie from "notie";
import routeSecurity from "../../router/routeSecurity";
import { store } from "../store";

export default {
  name: "UsersAdmin",
  data() {
    return {
      users: [],
      ready: false, // add to the other components
    };
  },
  async beforeMount() {
    try {
      routeSecurity();
      const response = await axios.post(
        process.env.VUE_APP_API_URL + "/api/admin/users",
        {},
        { headers: { Authorization: "Bearer " + store.token } }
      );
      if (response.data.error) {
        notie.alert({
          type: "error",
          text: response.data.message,
        });
      } else {
        this.users = response.data.data.users;
        this.ready = true;
      }
    } catch (error) {
      notie.alert({
        type: "error",
        text: error.message,
      });
    }
  },
  methods: {
    logUserOut(id) {
      if (id !== store.user.id) {
        notie.confirm({
          text: "Are you sure you want to log this user out?",
          submitText: "Log Out",
          submitCallback: function () {
            console.log("id", id);
          },
        });
      } else {
        notie.alert({
          type: "error",
          text: "You cannot log yourself out",
        });
      }
    },
  },
};
</script>
