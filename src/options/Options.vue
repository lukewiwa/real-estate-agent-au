<template>
  <div id="options">
    <h1>Highlight These Terms</h1>
    <ul>
      <li
      class="input-group"
      :key="index" 
      v-for="(term, index) in terms">
        <input class="form-control" v-model="term.word" required>
        <div class="input-group-append">
          <button 
          v-on:click="add(index)"
          type="button"
          class="btn btn-outline-success">+</button>
          <button v-on:click="remove(index)"
          type="button"
          class="btn btn-outline-danger">-</button>
        </div>
      </li>
    </ul>
    <button type="button" class="btn btn-primary" v-on:click="save()">Save</button>
    <div class="alert alert-primary" role="alert" v-if="alert">
      {{alert}}
    </div>
	</div>
</template>

<script>
const storageArea = chrome.storage.sync

export default {
  name: 'Options',
  data () {
    return {
      empty: {'word': ''},
      terms: [Object.assign({}, this.empty)],
      alert: false
    }
  },
  methods: {
    save: function () {
      storageArea.set(
        { terms: this.terms },
        () => {
          this.alert = 'saved succesfully!',
          setTimeout(() => {
            this.alert = false;
        }, 2000);
        }
      )
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
li {
  margin-top: 0.5em;
}
#options {
  margin: 2em;
  min-width: 30em;
  min-height: 25em;
}
</style>

