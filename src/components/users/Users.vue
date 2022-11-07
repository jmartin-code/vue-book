<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1 class="mt-3">All Users</h1>
        <hr />
        <table class="table table-compact table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
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
            </tr>
          </tbody>
        </table>
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
      ready: false,
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
        console.log(response.data.data.users);
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
