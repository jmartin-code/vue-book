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
        </form-tag>
      </div>
    </div>
  </div>
</template>

<script>
import routeSecurity from "../../router/routeSecurity";
import FormTag from "../forms/FormTag.vue";
import TextInput from "../forms/TextInput.vue";
// import notie from "notie";

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
  beforeMount() {
    routeSecurity();

    const id = +this.$route.params.userId;
    if (id) {
      //Editing user
    }
  },
};
</script>
