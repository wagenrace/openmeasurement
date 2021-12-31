<template>
  <h1>Login</h1>
  <form action="login">
    <input
      type="text"
      class="
        appearance-none
        w-8/12
        bg-grey-lighter
        text-grey-darker
        border border-red
        rounded
        py-3
        px-4
        mb-3
      "
      v-model="username"
    />
    <input
      type="password"
      class="
        appearance-none
        w-8/12
        bg-grey-lighter
        text-grey-darker
        border border-red
        rounded
        py-3
        px-4
        mb-3
      "
      v-model="password"
    />
    <div class="flex justify-around">
      <button @click="createAccount">Create Account</button>
      <button @click="login">Log In</button>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions({
      loginGun: "login",
      createAccountGun: "createAccount",
    }),
    login(e) {
      e.preventDefault();
      this.loginGun({ username: this.username, password: this.password });
    },
    createAccount(e) {
      e.preventDefault();
      this.createAccountGun({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>