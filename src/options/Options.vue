<template>
  <div id="options">
    <ul>
      <li :key="index" v-for="(term, index) in terms"><input v-model="term.word"/></li>
    </ul>
    <span>{{terms}}</span>
	</div>
</template>

<script>

var terms = [{'word': 'communal'},{'word': 'laundry'}]

export default {
  name: 'Options',
  data () {
    return {
      terms: terms
    }
  }
}
</script>

<style lang="sass" scoped>
@import 'bourbon'
@import 'bitters'


</style>

