<script>
//home office party park hospital
const locationPayoffs = [[-0.5, 0.5],[0.5, -0.5],[-0.5, 0.5],[-1.0, 1.0],[1.0, -1.0]]
//family friend colleague stranger
const relationPayoffs = [[-1.0, 1.0],[-0.5, 0.5],[0.5, -0.5],[1.0, -1.0]]
//family friend colleague stranger
const sanctionPayoffs = [[1.0, -1.0],[0.75, -0.75],[0.5, -0.5],[0.25, -0.25]]
//wear notwear
const preferencePayoffs = [[1.0, 1.0, -1.0, -1.0],[-1.0, -1.0, 1.0, 1.0]]
//wear not wear; no risk  high risk; action risk mapping
const healthPayoffs = [[0.0, 1.0],[0.0, -1.0]]


export default {
  data() {
    return {

      locationPayoffs: [[-0.5, 0.5],[0.5, -0.5],[-0.5, 0.5],[-1.0, 1.0],[1.0, -1.0]],
      //family friend colleague stranger
      relationPayoffs: [[-1.0, 1.0],[-0.5, 0.5],[0.5, -0.5],[1.0, -1.0]],
      //family friend colleague stranger
      sanctionPayoffs : [[1.0, -1.0],[0.75, -0.75],[0.5, -0.5],[0.25, -0.25]],
      //wear notwear
      preferencePayoffs: [[1.0, 1.0, -1.0, -1.0],[-1.0, -1.0, 1.0, 1.0]],
      //wear not wear; no risk  high risk; action risk mapping
      healthPayoffs: [[0.0, 1.0],[0.0, -1.0]],

      message: 'Please choose an action',
      buttonDisabled: true,
      relation: Math.floor(Math.random() * 4),
      target_type: Math.floor(Math.random() * 2), //0: doux; 1: vita
      target_preference: Math.floor(Math.random() * 2), //0: wear; 1: not wear
      target_health_risk: Math.floor(Math.random() * 2), //0: low; 1: high
      actionChosen: false,
      strategyChosen: false,
      action: '',
      self_health_risk: Math.floor(Math.random() * 2), //0: low; 1: high
      console: '',
      btn_text_all: '',
      btn_text_rules: '',
      btn_text_values: '',
      evaluation: '',
      p1: -1,
      p2: -1,
    }
  },
  methods: {
    chooseAction(action) {
      if (action == 0) {
        this.action = 0
        this.console += 'You choose to wear a mask\n'
      } else {
        this.action = 1
        this.console += 'You choose not to wear a mask\n'
      }
      this.actionChosen = true
      this.strategyChosen = false

      this.message = 'Please choose a rationale strategy'

      //share all
      this.btn_text_all += 'You choose to share all information. \n'
      this.btn_text_all += 'Choose to ' + this.actionLabel + ' mask due to \n'
      this.btn_text_all += 'The actor\'s perceived infection risk is '+ this.riskLabel + ', their preference is to ' + this.preferenceLabel
      + ' a mask, the other agent type prioritizes ' + this.target_agent_type + ', their relationship is ' + this.relationLabel
      + ', and the interaction takes place at ' + this.locationLabel

      //share Rules
      this.btn_text_rules += 'You choose to share decision rules for this context. \n'
      this.btn_text_rules += 'Choose to ' + this.actionLabel + ' mask due to \n'
      if ((this.action == 0 & this.self_health_risk == 1) || (this.action == 1 & this.self_health_risk == 1)) {
        this.btn_text_rules += 'the actors perceived infection risk is '+ this.riskLabel + ', '
      }
      if (this.action == this.preference) {
        this.btn_text_rules += 'their preference is to ' + this.preferenceLabel + ' a mask, '
      }
      this.btn_text_rules += 'the other agent type prioritizes ' + this.target_agent_type + ', '
      if ((relationPayoffs[this.relation][0] > 0 & self.action == 'wear') || (relationPayoffs[this.relation][1] > 0 & self.action == 'notwear')) {
        this.btn_text_rules += 'their relationship is ' + this.relationLabel + ', '
      }
      this.btn_text_rules += 'and the interaction takes place at ' + this.locationLabel

      //share values
      this.btn_text_values += 'You choose to share decision rules aligned with the values of you and the target for this context. \n'
      this.btn_text_values += 'Choose to ' + this.actionLabel + ' mask due to \n'
      if (this.green_play || this.target_type == 1) {
        if ((this.action == 0 & this.self_health_risk == 1) || (this.action == 1 & this.self_health_risk == 1)) {
          this.btn_text_values += 'the actors perceived infection risk is '+ this.riskLabel + ', '
        }
      }
      if (!this.green_play || this.target_type == 0) {
        if (this.action == this.preference) {
          this.btn_text_values += 'their preference is to ' + this.preferenceLabel + ' a mask, '
        }
      }

      this.btn_text_values += 'the other agent type prioritizes ' + this.target_agent_type + ', '
      if ((relationPayoffs[this.relation][0] > 0 & self.action == 'wear') || (relationPayoffs[this.relation][1] > 0 & self.action == 'notwear')) {
        this.btn_text_values += 'their relationship is ' + this.relationLabel + ', '
      }
      this.btn_text_values += 'and the interaction takes place at ' + this.locationLabel
      this.evaluation = this.calculatePayoff(this.target_preference, this.target_health_risk, this.relation, this.location, this.target_type)
      if (this.action != this.evaluation) {
        this.console += 'The agent looks directly at you\n'
      } else {
        this.console += 'The agent looks fine\n'
      }
    },
    chooseRationale(strategy) {
      if (strategy == 0) {
        this.p1 = this.preference
        this.p2 = this.self_health_risk
        this.console += 'You choose to share all information. \n'
      } else if (strategy == 1) {
        if ((this.action == 0 & this.self_health_risk == 1) || (this.action == 1 & this.self_health_risk == 1)) {
          this.p2 = this.self_health_risk
        }
        if (this.action == this.preference) {
          this.p1 = this.preference
        }
        this.console += 'You choose to share decision rules for this context. \n'
      } else {
        if (this.green_play || this.target_type == 1) {
          if ((this.action == 0 & this.self_health_risk == 1) || (this.action == 1 & this.self_health_risk == 1)) {
            this.p2 = this.self_health_risk
          }
        }
        if (!this.green_play || this.target_type == 0) {
          if (this.action == this.preference) {
            this.p1 = this.preference
          }
        }
        this.console += 'You choose to share decision rules aligned with the values of you and the target for this context. \n'
      }

      this.strategyChosen = true
      this.message = 'Please choose an action'
      //this.evaluation = this.calculatePayoff(this.preference, this.self_health_risk, this.relation, this.location, this.target_type)
      this.evaluation = this.calculatePayoff(this.p1, this.p2, this.relation, this.location, this.target_type)
      if (this.action != this.evaluation) {
        this.console += 'The agent looks directly at you\n'
      } else {
        this.console += 'The agent looks fine\n'
      }
    },
    calculatePayoff(preference, risk, relation, location, type) {
      //relation+location+values
      //const locationPayoffs = [[-0.5, 0.5],[0.5, -0.5],[-0.5, 0.5],[-1.0, 1.0],[1.0, -1.0]]
      //family friend colleague stranger
      //const relationPayoffs = [[-1.0, 1.0],[-0.5, 0.5],[0.5, -0.5],[1.0, -1.0]]
      //family friend colleague stranger
      //const sanctionPayoffs = [[1.0, -1.0],[0.75, -0.75],[0.5, -0.5],[0.25, -0.25]]
      //wear notwear
      //const preferencePayoffs = [[1.0, 1.0, -1.0, -1.0],[-1.0, -1.0, 1.0, 1.0]]
      //wear not wear; no risk  high risk; action risk mapping
      //const healthPayoffs = [[0.0, 1.0],[0.0, -1.0]]

      return (this.locationPayoffs[location][0] + this.relationPayoffs[relation][0] + (type == 0? this.preferencePayoffs[preference][0][0]: 0) + (type == 1? this.healthPayoffs[0][risk]: 0)) > (this.locationPayoffs[location][1] + this.relationPayoffs[relation][1] + (type == 0? this.preferencePayoffs[preference][1][0]: 0) + (type == 1? this.healthPayoffs[1][risk]: 0)) ? 0 : 1
    },
    restart() {
      this.$router.push({ name: 'start' });
    },
    goBack(state) {
      if (state == 1) {
        this.action = ''
        this.actionChosen = false
        this.message = 'Please choose an action \n'
        this.btn_text_all = ''
        this.btn_text_rules = ''
        this.btn_text_values = ''
        this.console += 'You go back to action selection \n'
      } else {
        this.strategyChosen = false
        this.message = 'Please choose a rationale strategy'
        this.console += 'You go back to rationale selection'
      }
    }
  },
  props:{
    green_play: {
      type: Boolean,
      default: false,
      required: true
    },
    //preference: String,
    //location: String
    preference: Number,
    location: Number
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
    actionLabel(){
      if (this.action == 0) {
        return 'Wear'
      } else if (this.action == 1) {
        return 'Not wear'
      }
    },
    locationLabel() {
      if (this.location == 0) {
        return 'Home'
      } else if (this.location == 1) {
        return 'Office'
      } else if (this.location == 2) {
        return 'Party'
      } else if (this.location == 3) {
          return 'Park'
      } else {
        return 'Hospital'
      }
    },
    preferenceLabel() {
      if (this.preference == 0) {
        return 'Wear'
      } else if (this.preference == 1) {
        return 'Not Wear'
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
    },
    actor_agent_type() {
      return this.green_play === 'true' ? 'Health': 'Freedom'
    }
  }
}

</script>

<template>
  <div class="grid-container align-center justify-center">
    <div class="grid-item header">
      <h2>Someone who values {{target_agent_type}} more is nearby at the {{locationLabel}}</h2>
      <p>Agent ({{actor_agent_type}}) Viewpoint: <br/></p>
    </div>
    <div class="content">
      <div class="grid-item characters">
        <img v-if="target_type" src="./assets/characters/vita_05.png" width="90" height="90" />
        <img v-else src="./assets/characters/doux_05.png" width="90" height="90" />
      </div>
      <div class="grid-item characters">
        <img v-if="green_play == 'true'" src="./assets/characters/vita_01.png" width="130" height="130" />
        <img v-else src="./assets/characters/doux_01.png" width="130" height="130" />

        <p class="center">Relationship: {{relationLabel}} <br/> Your perceived infection risk is {{riskLabel}} <br/> You prefer {{preferenceLabel}} mask</p>
      </div>
      <div class="message-center">
        <h4>{{message}}</h4>
      </div>
      <div class="grid-item buttons" v-if="!actionChosen&!strategyChosen">
        <button @click="chooseAction(0)">Wear mask</button>
        <button @click="chooseAction(1)">Not wear mask</button>
      </div>
      <div class="grid-item buttons" v-else-if="actionChosen&!strategyChosen">
        <button @click="chooseRationale(0)">{{btn_text_all}}</button>
        <button @click="chooseRationale(1)">{{btn_text_rules}}</button>
        <button @click="chooseRationale(2)">{{btn_text_values}}</button>
      </div>
      <div class="grid-item buttons" v-if="actionChosen&!strategyChosen">
        <button @click="goBack(1)">Back to Action Selection</button>
      </div>
      <div class="grid-item buttons" v-if="actionChosen&strategyChosen">
        <button @click="goBack(2)">Back to Rationale Selection</button>
      </div>
      <div class="grid-item buttons" v-else>
        <button @click="restart">Restart</button>
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
  width:100%;
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
