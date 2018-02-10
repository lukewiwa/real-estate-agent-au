<template>
  <div id="popup">
		<h1>My Popup</h1>
    <p>{{message}}</p>
	</div>
</template>

<script>



export default {
  name: 'Popup',
  data () {
    return {
      message: ''
    }
  },
  created: function () {
    chrome.tabs.query(
      {active: true, currentWindow: true},
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {from: 'popup'},
          (response) => {
            this.message = response
          } 
        )
      }
    )
  }
}
</script>

<style scoped>

</style>
