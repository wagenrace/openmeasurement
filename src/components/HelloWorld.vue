<template>
  <div class="hello">
    <form action="sendMessage">
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
        name="newMessage"
        id="newMessage"
        v-model="newMessage"
      /><button @click="sendMessage">Send</button>
    </form>
    Hello {{ userName }} you have
    {{ Object.keys(storeAllMessages).length }} messages
    <div
      class="bg-blue-300"
      v-for="messageId in Object.keys(storeAllMessages)"
      :key="messageId"
    >
      <p>Message:{{ storeAllMessages[messageId].message }}</p>
      <button @click="deleteMessage(messageId)">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      newMessage: "",
    };
  },
  computed: {
    ...mapGetters({
      userName: "getUserName",
      storeAllMessages: "getAllMessages",
    }),
  },
  methods: {
    ...mapActions({
      login: "login",
      deleteMessageGun: "deleteMessage",
      addMessageGun: "addMessage",
    }),
    addMessage(say, id) {
      if (!say) {
        return;
      }
      this.allMessages.push({
        id,
        message: say,
      });
    },
    sendMessage(e) {
      e.preventDefault();
      this.addMessageGun({ newMessage: this.newMessage });
      this.newMessage = "";
    },
    deleteMessage(messageId) {
      this.deleteMessageGun({ messageId });
    },
  },
  mounted() {
    const username = "a";
    const password = "1234567890";
    this.login({ username, password });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
