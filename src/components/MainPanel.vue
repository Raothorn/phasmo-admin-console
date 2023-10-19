<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="map"> Map </v-tab>
      <v-tab value="sanity"> Sanity </v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="map">
          <Map></Map>
        </v-window-item>
        <v-window-item value="sanity">
          <Sanity></Sanity>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useGame } from "@/store/game";
import { ref } from "vue";
import Map from "@/components/Map.vue"
import Sanity from "@/components/Sanity.vue"

const tab = ref("map")

// const game = useGame();
</script>
