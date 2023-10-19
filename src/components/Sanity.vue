<template>
  <canvas id="sanity_canvas" width="1083" height="632"></canvas>
  <!-- <v-container> -->
  <!--   <v-row> -->
  <!--     <v-col class="mx-auto" cols="auto"> -->
  <!--     </v-col> -->
  <!--   </v-row> -->
  <!-- </v-container> -->
</template>

<script setup lang="ts">
import { Player, useGame } from "@/store/game";
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

var canvas: HTMLCanvasElement | null = null;
var bg: HTMLImageElement | null = null;

onMounted(() => {
  canvas = document.getElementById("sanity_canvas") as HTMLCanvasElement;

  console.log("loading image");
  bg = new Image();
  bg.src = "/sanity.png";
  bg.onload = draw;
});

function draw() {
  if (bg == null || canvas == null) {
    return;
  }
  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0);

  let rects = getSanityRects(players.value.length);

  for (let i = 0; i < rects.length; i++) {
    drawSanity(ctx, rects[i], players.value[i]);
  }
}

function drawSanity(ctx: CanvasRenderingContext2D, rect: Rect, player: Player) {
  // Draw border
  ctx.fillStyle = colors.border;
  ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

  let nameBg = cutRectH(cutRectV(rect, 5 ,60), 2, 98);
  ctx.fillStyle = colors.usernameBg;
  ctx.fillRect(nameBg.x, nameBg.y, nameBg.width, nameBg.height);

  ctx.fillStyle = colors.usernameFg;
  ctx.font = "bold 48px sans-serif"
  ctx.fillText(player.name, nameBg.x, nameBg.y + 45, nameBg.width)

  let sanityBg = cutRectH(cutRectV(rect, 65, 95), 2, 98);
  ctx.fillStyle = colors.sanityBg;
  ctx.fillRect(sanityBg.x, sanityBg.y, sanityBg.width, sanityBg.height)

  let sanity = player.sanity;
  let sanityFg = cutRectH(sanityBg,0, sanity);
  ctx.fillStyle = colors.sanityFg;
  ctx.fillRect(sanityFg.x, sanityFg.y, sanityFg.width, sanityFg.height)

  ctx.fillStyle = colors.usernameFg;
  ctx.font = "bold 28px sans-serif";
  ctx.fillText(`${sanity.toFixed(2)}%`, sanityBg.x + 5, sanityBg.y + 25)
}

function cutRectH(rect: Rect, minPercent: number, maxPercent: number): Rect {
  let min = minPercent / 100;
  let max = maxPercent / 100;
  let total = max - min;

  let width = total * rect.width;
  let x = rect.x + (min * rect.width);

  return { x: x, y: rect.y, width: width, height: rect.height };
}

function cutRectV(rect: Rect, minPercent: number, maxPercent: number): Rect {
  let min = minPercent / 100;
  let max = maxPercent / 100;
  let total = max - min;

  let height = total * rect.height;
  let y = rect.y + (min * rect.height);

  return { x: rect.x, y: y, width: rect.width, height: height };
}

function divideRectH(rect: Rect, n: number, marginPercent: number): Rect[] {
  let width = rect.width / n;

  let rects = [];
  for (let i = 0; i < n; i++) {
    let x = rect.x + i*width;
    let r = {x:x, y: rect.y, width: width, height: rect.height};
    rects.push(cutRectH(r, marginPercent, 100 - marginPercent))
  }
  return rects;
}

function divideRectV(rect: Rect, n: number, marginPercent: number): Rect[] {
  let height = rect.height / n;

  let rects = [];
  for (let i = 0; i < n; i++) {
    let y = rect.y + i*height;
    let r = {x:rect.x, y: y, width: rect.width, height: height};
    rects.push(cutRectV(r, marginPercent, 100 - marginPercent));
  }
  return rects;
}

function getCenteredRect(rect: Rect, width: number):  Rect {
  if (width > rect.width) {
    console.log("too big")
    return rect;
  }

  let ratio = 1 - (width / rect.width);
  let halfRatio = ratio / 2;
  let percent = halfRatio * 100;

  return cutRectH(rect, percent, 100-percent);
}

function getSanityRects(numPlayers: number): Rect[] {
  let numFullRows = Math.floor(numPlayers / 3);
  let extraRow = numPlayers % 3;

  let outer = { x: 14, y: 173, width: 1057, height: 444 };
  let rows = divideRectV(outer, 4, 10);

  let rects: Rect[] = [];

  for (let i = 0; i < numFullRows; i++) {
    let row = rows[i];
    let cols = divideRectH(row, 3, 15);

    for (let col of cols) {
      rects.push(col);
    }
  }

  if (extraRow != 0) {
    let row = rows[numFullRows];
    let cols = divideRectH(row, extraRow, 15);

    for (let col of cols) {
      rects.push(col)
    }
  }

  return rects.map(r => getCenteredRect(r, 250));
}

type Rect = { x: number, y: number, width: number, height: number };

const playerColors = [
  { light: "", dark: "" }
];

const colors = {
  border: "#FFFFFF",
  usernameBg: "#0F1A1D",
  usernameFg: "#FFFFFF",
  sanityBg: "#8B0000",
  sanityFg: "red"
}
</script>
