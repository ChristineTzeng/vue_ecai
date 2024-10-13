<script>

export default {
  data() {
    return {
      green_play: false,
      blue_play: false,
      greenImage: './assets/characters/vita_00.png',
      blueImage: './assets/characters/doux_00.png'
    }
  },
  methods: {
    toggle() {
      //this.awesome = !this.awesome
      this.green_play = !this.green_play
    },
    enter: {

    }
  }
}

function getCharacterImage(name) {

  return new URL('./assets/characters/doux_21.png', import.meta.url).href

}
</script>

<template>
  <div>
    <h1>Select Role</h1>
  </div>
  <div>
    <img v-if="greenImage" src="./assets/characters/vita_00.png" width="125" height="125" />
    <img v-else src="./assets/characters/vita_21.png" width="125" height="125" />
    <img v-if="blueImage" src="./assets/characters/doux_00.png" width="125" height="125" />
    <img v-else src="./assets/characters/doux_21.png" width="125" height="125" />
  </div>

  <button :disabled="isButtonDisabled" @click="enter">Enter</button>
</template>
