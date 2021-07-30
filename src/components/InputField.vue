<template lang="pug">
form(class="input-field" @submit.prevent="sendInput")
	input(:placeholder="label" v-model="userInput")

</template>

<script>

export default {
	name: 'InputField',
	props: {
		label: String
	},
	data: () => {
		return {
			userInput: ''
		}
	},
	methods: {
		sendInput () {
			const trimmedInput = this.userInput.trim()
			if (!trimmedInput) { // if userInput is falsy
				return
			}
			this.$emit('userInput', trimmedInput)
			this.userInput = '' // clear field
		}
	}
}
</script>

<style scoped lang="scss">

</style>
