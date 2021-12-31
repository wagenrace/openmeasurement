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
      if (e) e.preventDefault();
      this.addMessageGun({ newMessage: this.newMessage });
      this.newMessage = "";
    },
    deleteMessage(messageId) {
      this.deleteMessageGun({ messageId });
    },
  },
};
</script>
