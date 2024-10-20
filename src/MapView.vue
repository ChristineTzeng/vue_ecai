<script setup>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()

  const search = computed({
    get() {
      return route.query.search ?? ''
    },
    set(search) {
      router.replace({ query: { search } })
    }
  })
</script>
<script>

export default {
  data() {
    return {
      message: '',
      green_play: false,
      blue_play: false,
    }
  },
  methods: {
    enter: {
      
    }
  }
}

</script>

<template>
  <div class="grid-container align-center justify-center">
    <br/>
    <div class="content">
      <div class="center">
        <h4>Please choose where to go</h4>
      </div>
      <br/>
      <div class="grid-item buttons">
        <button @click="enter">Home</button>
        <button @click="enter">Office</button>
        <button @click="enter">Party</button>
        <button @click="enter">Park</button>
        <button @click="enter">Hospital</button>
      </div>
      <div class="grid-item image">
        <img v-if="green_play" src="./assets/characters/vita_05.png" width="125" height="125" />
        <img v-else src="./assets/characters/vita_05.png" width="125" height="125" />
      </div>
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
