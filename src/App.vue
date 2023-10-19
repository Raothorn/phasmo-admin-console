<template>
  <v-app>
    <v-main>
      <template v-if="game.gamedata">
        <Lobby v-if="'Lobby' in game.gamedata"></Lobby>
        <MainPanel v-else></MainPanel>
      </template>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGame } from "@/store/game";
import Lobby from '@/components/Lobby.vue'
import MainPanel from '@/components/MainPanel.vue'

const game = useGame();
</script>
