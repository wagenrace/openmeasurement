<template>
  <div class="hello">
    <form action="sendMessage">
      <input
        type="text"
        class="appearance-none w-8/12 bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
        name="newMessage"
        id="newMessage"
        v-model="newMessage"
      /><button @click="sendMessage">Send</button>
    </form>
    You have {{ allMessages.length }} messages
    <div class="bg-blue-300" v-for="message in allMessages" :key="message.id">
      <p>Message:{{ message.message }}</p>
      <button @click="deleteMessage(message.id)">Delete</button>
    </div>
  </div>
</template>

<script>
import Gun from "gun/gun";
require("gun/sea");

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      gun: null,
      user: null,
      allMessages: [],
      newMessage: "",
    };
  },
  methods: {
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
      if (!this.user.is) {
        return;
      }
      this.user.get("said").set(this.newMessage);
      this.newMessage = "";
    },
    deleteMessage(messageId) {
      if (!this.user.is) {
        return;
      }
      this.user.get("said").get(messageId).put(null);
    },
  },
  mounted() {
    const username = "a";
    const password = "1234567890";
    this.gun = Gun(["http://localhost:8765/gun"]);
    this.user = this.gun.user();
    this.user.auth(username, password);

    this.gun.on("auth", () => {
      this.user.get("said").map().once(this.addMessage);
    });
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
