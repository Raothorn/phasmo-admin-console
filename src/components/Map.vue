<template>
  <v-container>
    <v-row>
      <v-col class="mx-auto" cols="auto">
        <canvas id="map_canvas" width="1083" height="632"></canvas>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGame } from "@/store/game";
import { onMounted, watch, computed } from "vue";

const game = useGame();

const players = computed(() => {
  if (game.gamedata == null || !("Sim" in game.gamedata)) {
    return [];
  }
  return game.gamedata.Sim.players;
});

watch(players, (_) => {
  draw();
});

// Canvas stuff
var canvas: HTMLCanvasElement | null = null;
var bg: HTMLImageElement | null = null;

onMounted(() => {
  canvas = document.getElementById("map_canvas") as HTMLCanvasElement;

  console.log("loading image");
  bg = new Image();
  bg.src = "/map2.png";
  bg.onload = draw;
});

function draw() {
  if (bg == null || canvas == null) {
    return;
  }
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0);

  drawPlayers(ctx);
}

function drawPlayers(ctx: CanvasRenderingContext2D) {
  if (game.gamedata == null || !("Sim" in game.gamedata)) {
    return;
  }

  let players = game.gamedata.Sim.players;

  ctx.fillStyle = "#32CD32";

  for (let i = 0; i < roomCenters.length; i++) {
    let roomPlayers = players.filter((p) => p.last_loc == i).map((p) => p.name);
    drawRoomPlayers(ctx, roomCenters[i], roomPlayers)
  }
}

function drawRoomPlayers(ctx: CanvasRenderingContext2D, room: Point, players: string[]) {
  if (players.length == 0) {
    return;
  }
  console.log(`Drawing players in room ${room}`)
  let yOffset = 0;
  for (let player of players) {
    let x = room.x;
    let y = room.y + yOffset;

    ctx.fillRect(x, y, 10, 10);
    ctx.fillText(player, x + 15, y + 8)

    yOffset += 15;
  }

}

const roomCenters = [
  { x: 690, y: 331}, //0
  { x: 341, y: 294}, //1
  { x: 425, y: 304}, //2
  { x: 341, y: 364}, //3
  { x: 381, y: 415}, //4
  { x: 332, y: 443}, //5
  { x: 460, y: 445}, //6
  { x: 468, y: 343}, //7
  { x: 469, y: 293}, //8
  { x: 527, y: 300}, //9
  { x: 536, y: 369}, //10
]


type Point = {x: number, y: number}
</script>
