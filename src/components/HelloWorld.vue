<template>
  <p>{{ game.gamedata }}</p>
</template>

<script setup lang="ts">
import { useGame } from "@/store/game";

const game = useGame();
</script>
