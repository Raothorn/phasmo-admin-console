import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";

export const useGame = defineStore("game", () => {
  const gamedata: Ref<GameData | null> = ref(null);

  const socket: WebSocket = new WebSocket("wss://192.168.1.199:2000/");

  function sendMessage(msg: any) {
    let msgStr = JSON.stringify(msg);
    socket.send(msgStr);
  }

  socket.onopen = (_) => {
    let msg = { ConnectAsAdmin: {} };
    sendMessage(msg);
  };

  const ticks = ref(0);

  socket.onmessage = (event) => {
    ticks.value++;
    let update: GameData = JSON.parse(event.data);
    gamedata.value = update;
    // console.log(update)

    if ("Sim" in update) {
      const $toast = useToast();
      for (let notification of update.Sim.notifications) {
        // console.log(notification)
        $toast.warning(notification, { duration: 0 });
      }
    }
  };

  return { gamedata, sendMessage, ticks };
});

export type GameData =
  | { Lobby: { players: string[] } }
  | { Sim: { players: Player[]; notifications: string[] } };

export type Player = {
  name: string;
  addr: any;
  last_loc: number | null;
  sanity: number;
};
