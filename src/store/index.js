import { createStore } from "vuex";
import Gun from "gun/gun";
require("gun/sea");

const gun = Gun(["http://localhost:8765/gun"]);
const user = gun.user();

export default createStore({
  state: {
    userName: null,
    allMessages: {},
    following: [
      "C2KZ4_E1cPDbfRevWMTQgVDzXYHwluql6-at7Z_dRXU.eTlPSyQilF4HzBshCpexKaeb_GndqL2CKrfw1KqVgsE",
      "j3mHe4qQCruLkJk-MGqVxX2Pp01FiZH5Uzif0qBUa1Q.M0Glgxx52jma2eRrnduURZsHjldjvimLXpLH0Z_Z8AU",
    ],
  },
  mutations: {
    loadMessage(state, payload) {
      if (!payload.message) {
        delete state.allMessages[payload.id];
        return;
      }

      // Get userName (alias)
      let userName;
      const userId = payload.id.split("/")[0].replace("~", "");
      console.log(payload.id)
      gun
        .user(userId)
        .get("alias")
        .once((alias) => (userName = alias));

      // Create return
      state.allMessages[payload.id] = {
        id: payload.id,
        message: payload.message.message,
        rawMessage: payload.message,
        userName,
        time: payload.message.time,
      };
    },
    deleteLocalMessages(state, payload) {
      state.allMessages = {};
    },
    setUserName(state, payload) {
      state.userName = payload.userName;
    },
  },
  actions: {
    login(state, payload) {
      state.commit("deleteLocalMessages", {});
      user.auth(payload.username, payload.password);
      gun.on("auth", () => {
        user
          .get("posts")
          .map()
          .on((message, id) => state.commit("loadMessage", { message, id }));
        user.get("alias").once((userName, id) => state.commit("setUserName", { userName }));
      });
    },
    createAccount(state, payload) {
      user.create(payload.username, payload.password);
      this.dispatch("login", payload);
    },
    deleteMessage(state, payload) {
      if (!user.is) {
        return;
      }
      user.get("posts").get(payload.messageId).put(null);
    },
    loadMessages(state, payload) {
      state.state.following.forEach((publicKeyFollowing) => {
        gun
          .user(publicKeyFollowing)
          .get("posts")
          .map()
          .on((message, id) => state.commit("loadMessage", { message, id }));
      });
    },
    addMessage(state, payload) {
      if (!user.is) {
        return;
      }
      user.get("posts").set({ message: payload.message, time: Date.now() });
    },
  },
  modules: {},
  getters: {
    getUserName: (state) => state.userName,
    getAllMessages: (state) => state.allMessages,
  },
});
