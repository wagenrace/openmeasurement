import { createStore } from "vuex";
import Gun from "gun/gun";
require("gun/sea");

const gun = Gun(["http://localhost:8765/gun"]);
const user = gun.user();

export default createStore({
  state: {
    userName: null,
    allMessages: {},
  },
  mutations: {
    loadMessage(state, payload) {
      if (!payload.say) {
        delete state.allMessages[payload.id];
        return;
      }
      state.allMessages[payload.id] = {
        id: payload.id,
        message: payload.say,
      };
    },
    setUserName(state, payload) {
      state.userName = payload.userName
    }
  },
  actions: {
    login(state, payload) {
      user.auth(payload.username, payload.password);
      gun.on("auth", () => {
        user
          .get("said")
          .map()
          .on((say, id) => state.commit("loadMessage", { say, id }));
        user.get("alias").once((userName, id) => state.commit("setUserName", {userName}))
      });
    },
    deleteMessage(state, payload) {
      if (!user.is) {
        return;
      }
      user.get("said").get(payload.messageId).put(null);
    },
    addMessage(state, payload) {
      if (!user.is) {
        return;
      }
      user.get("said").set(payload.newMessage);
    },
  },
  modules: {},
  getters: {
    getUserName: (state) => state.userName,
    getAllMessages: (state) => state.allMessages,
  },
});
