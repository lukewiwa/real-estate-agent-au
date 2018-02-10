<template>
  <div id="options">
    <h1>Highlight These Terms</h1>
    <ul>
      <li :key="index" v-for="(term, index) in terms">
        <input v-model="term.word"/>
        <button v-on:click="add(index)">+</button>
        <button v-on:click="remove(index)">-</button>
      </li>
    </ul>
    <button v-on:click="save()">Save</button>
	</div>
</template>

<script>
const storageArea = chrome.storage.sync

export default {
  name: "Options",
  data () {
    return {
      empty: {'word': ''},
      terms: [Object.assign({}, this.empty)]
    }
  },
  methods: {
    save: function () {
      storageArea.set({ terms: this.terms })
    },
    add: function (index) {
      this.terms.splice(index + 1, 0, Object.assign({}, this.empty))
    },
    remove: function (index) {
      if (this.terms.length > 1) {
        this.terms.splice(index, 1)
      }
    }
  },
  created: function () {
    storageArea.get("terms", storage => {
      if (Object.keys(storage.terms).length !== 0) {
        this.terms = storage.terms
      }
    })
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 0;
}
</style>

