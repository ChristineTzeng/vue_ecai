<script>

export default {
  data() {
    return {
      message: '',
      green_play: false,
      blue_play: false,
      greenImage: './assets/characters/vita_00.png',
      blueImage: './assets/characters/doux_00.png',
      buttonDisabled: true,
      preference: 'wear',
    }
  },
  methods: {
    toggle(agent_type) {
      if (agent_type == 'doux') {
        this.blue_play = !this.blue_play
        this.green_play = false
      } else {
        this.green_play = !this.green_play
        this.blue_play = false
      }

      if (this.blue_play){
        this.message = 'Freedom agent'
      } else if (this.green_play) {
        this.message = 'Health agent'
      } else {
        this.message = ''
      }
      this.buttonDisabled = !(this.green_play || this.blue_play)
    },
    enterLocation(loc) {
      this.$router.push('/location/' + this.green_play + '/' + this.preference + '/' + loc)
    }
  }
}

</script>

<template>
  <div class="grid-container align-center justify-center">
    <div class="grid-item header">
      <h2>Playground </h2>
    </div>
    <br/>
    <div class="content">
      <div class="center">
        <h4 v-if="buttonDisabled">Please choose your type of agent</h4>
        <h4 v-else="buttonDisabled">Please choose where to go</h4>
      </div>
      <br/>
      <div class="message-center">
        <h4>{{message}}</h4>
      </div>

      <div class="grid-item image">
        <img v-if="green_play" src="./assets/characters/vita_21.png" width="125" height="125" @click="toggle('vita')"/>
        <img v-else src="./assets/characters/vita_00.png" width="125" height="125" @click="toggle('vita')" />
        <img v-if="blue_play" src="./assets/characters/doux_21.png" width="125" height="125" @click="toggle('doux')" />
        <img v-else src="./assets/characters/doux_00.png" width="125" height="125" @click="toggle('doux')" />
      </div>
      <br/>
      <div>Daily Preference:
        <input type="radio" id="wear" value="wear" v-model="preference" />
        <label for="wear">Wear Mask</label>

        <input type="radio" id="notwear" value="notwear" v-model="preference" />
        <label for="notwear">Not wear mask</label>
      </div>
      <br/>
      <div class="grid-item buttons">
        <button :disabled="buttonDisabled" @click="enterLocation('Home')">Home</button>
        <button :disabled="buttonDisabled" @click="enterLocation('Office')">Office</button>
        <button :disabled="buttonDisabled" @click="enterLocation('Party')">Party</button>
        <button :disabled="buttonDisabled" @click="enterLocation('Park')">Park</button>
        <button :disabled="buttonDisabled" @click="enterLocation('Hospital')">Hospital</button>
      </div>
      <br/>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-areas:
    "header"
    "image"
    "buttons";
  gap: 20px;
  padding: 20px;

  position: relative;
  text-align: center;
  width:100%;
  height:100%;
}

.header {
  grid-area: header;
  text-align: center;
}

.image {
  grid-area: image;
  display: flex;
  justify-content: center;
}

.buttons {
  grid-area: buttons;
  display: flex;
  justify-content: center;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}

.center {
  text-align: center;
  border: 3px solid green;
}

.message-center {
  text-align: center;
  height:20px;
}

</style>
