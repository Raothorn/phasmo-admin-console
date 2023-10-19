<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title>Lobby</v-card-title>
          <v-card-item>
            <v-list density="compact" lines="one">
              <v-list-item v-for="player in players">
                {{ player }}
              </v-list-item>
            </v-list>
          </v-card-item>
          <v-card-actions>
            <v-btn class="mx-auto w-100" @click="startSim" color="primary" variant="tonal">Start Game</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>Settings</v-card-title>
          <v-card-subtitle>All time values are in seconds</v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col>
                  <v-slider label="Event pulse interval" thumb-label="always" min="0" max="60" step="1">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(0)}s` }}
                    </template>
                  </v-slider>
                </v-col>
                <v-col>
                  <v-slider label="Ghost move interval" thumb-label="always" min="0" max="60" step="1">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(0)}s` }}
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-slider label="Ghost orb duration" thumb-label="always" max="60" step="1">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(0)}s` }}
                    </template>
                  </v-slider>
                </v-col>
                <v-col>
                  <v-slider label="Ghost orb frequency" thumb-label="always" min="0" max="100">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(2)}%` }}
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-slider label="Ghost interaction frequency" thumb-label="always" min="0" max="100">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(2)}%` }}
                    </template>
                  </v-slider>
                </v-col>
                <v-col>
                  <v-slider label="Ghost event frequency" thumb-label="always" min="0" max="1">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(2)}%` }}
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-slider label="EMF blast duration" thumb-label="always" min="0" max="10" step="1">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(0)}s` }}
                    </template>
                  </v-slider>
                </v-col>
                <v-col>
                  <v-slider label="Sanity drain rate(%/s)" thumb-label="always" min="0" max="2">
                    <template v-slot:thumb-label="{ modelValue }">
                      {{ `${modelValue.toFixed(2)}%/s` }}
                    </template>
                  </v-slider>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-evenly">
              <v-btn variant="tonal">Submit</v-btn>
              <v-btn variant="tonal">Defaults</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useGame } from "@/store/game";
import { computed } from "vue";

const game = useGame();

const players = computed(() => {
  if (game.gamedata == null || !("Lobby" in game.gamedata)) {
    return [];
  } else {
    return game.gamedata.Lobby.players;
  }
});

function startSim() {
  let msg = { StartSim: {} };
  game.sendMessage(msg);
}
</script>
