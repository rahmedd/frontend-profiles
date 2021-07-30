<template lang="pug">
	div(id="app")
		AppContainer

</template>

<script>
import AppContainer from './components/AppContainer.vue'

export default {
	name: 'App',
	components: {
		AppContainer
	}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&display=swap');

html, body, * {
	box-sizing: border-box;
}

body {
	font-family: Raleway, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	margin: 0;
	background: #dcdcdc;
	color: gray;
}
</style>
