<script>

export default {
  data() {
    return {
      message: 'Please choose an action',
      buttonDisabled: true,
      relation: Math.floor(Math.random() * 4),
      target_type: Math.floor(Math.random() * 2), //0: doux; 1: vita
      actionChosen: false,
      action: '',
      self_health_risk: Math.floor(Math.random() * 2), //0: low; 1: high
      console: '',
    }
  },
  methods: {
    chooseAction(action) {
      if (action) {
        this.action = 'wear'
        this.console += 'You choose to wear a mask\n'
      } else {
        this.action = 'notwear'
        this.console += 'You choose not to wear a mask\n'
      }
      this.actionChosen = true

      this.message = 'Please choose a rationale strategy'
    },
    chooseRationale(strategy) {
      if (strategy == 0) {
        this.console += 'You choose to share all information: \n'
      } else if (strategy == 1) {
        this.console += 'You choose to share decision rules for this context: \n'
      } else {
        this.console += 'You choose to share decision rules aligned with THE values of you and the target for this context: \n'
      }
    },
    goToStart() {
      this.$router.push({ name: 'start' });
    },
  },
  props:{
    green_playing: Boolean,
    preference: String,
    location: String
  },
  computed: {
    relationLabel() {
      if (this.relation == 0) {
        return 'Family'
      } else if (this.relation == 1) {
        return 'Friend'
      } else if (this.relation == 2) {
        return 'Colleague'
      } else {
        return 'Stranger'
      }
    },
    riskLabel() {
      if (this.self_health_risk == 0) {
        return 'Low'
      } else {
        return 'High'
      }
    },
    target_agent_type() {
      return this.target_type == 0 ? 'freedom': 'health'
    }
  }
}

</script>

<template>
  <div class="grid-container align-center justify-center">
    <div class="grid-item header">
      <h2>Someone who values {{target_agent_type}} more is nearby at the {{location}}</h2>
    </div>
    <div class="content">
      <div class="grid-item characters">
        <img v-if="target_type" src="./assets/characters/vita_05.png" width="90" height="90" />
        <img v-else src="./assets/characters/doux_05.png" width="90" height="90" />
      </div>
      <div class="grid-item characters">
        <img v-if="green_playing" src="./assets/characters/vita_01.png" width="130" height="130" />
        <img v-else src="./assets/characters/doux_01.png" width="130" height="130" />
        <p>Agent Viewpoint: <br/></p>
        <p class="center">Relationship: {{relationLabel}} <br/> Infection Risk: {{riskLabel}}</p>
      </div>
      <div class="message-center">
        <h4>{{message}}</h4>
      </div>
      <div class="grid-item buttons" v-if="!actionChosen">
        <button @click="chooseAction(1)">Wear mask</button>
        <button @click="chooseAction(0)">Not wear mask</button>
      </div>
      <div class="grid-item buttons" v-else>

        <button @click="chooseRationale(0)">Share All</button>
        <button @click="chooseRationale(1)">Share Decision Rules</button>
        <button @click="chooseRationale(2)">Share Value-Aligned Rules</button>
      </div>

      <div class="console-align">
        <p>{{console}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-areas:
    "header"
    "characters"
    "buttons"
    "console";
  gap: 20px;
  padding: 20px;

  position: relative;
  width:100%;
  height:100%;
}

.header {
  grid-area: header;
  text-align: center;
  width:100%;
}

.characters {
  grid-area: characters;
  display: flex;
  justify-content: center;
}

.buttons {
  grid-area: buttons;
  display: flex;
  justify-content: center;
  gap: 10px;
  width:100%;
}

.console {
  grid-area: console;
  text-align: center;
  justify-content: center;
  width:100%;
}

button {
  padding: 10px 20px;
  font-size: 16px;
}

.message-center {
  text-align: center;
  border: 3px solid green;
}

.console-align {
  text-align: left;
  display: flex;
  border: 1px solid #ccc;
  width:100%;
  white-space: pre-line;
}

.center {
  text-align: center;
}

/* Main character */
.character {
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
  border-radius: 50%;
}

/* Position main character */
.main-character {
  /* top: 200px;
  left: 200px; */

  grid-area: characters;
  display: flex;
  justify-content: center;
}

/* Nearby character, close to the main character */
.nearby-character {
  /* top: 150px;
  left: 470px; */

  grid-area: characters;
  display: flex;
  justify-content: center;
  vertical-align: top;
  gap: 5px;
}

/* Faraway characters */
.faraway-character {
  /* top: 100px;
  left: 400px; */

  grid-area: characters;
  display: flex;
  justify-content: center;
  vertical-align: top;
  gap: 5px;
}

.faraway-character:nth-child(4) {
  /* top: 350px;
  left: 450px; */
}

.badge-notify{
   position:relative;
   text-align: center;
   height:20px;
  }
</style>
