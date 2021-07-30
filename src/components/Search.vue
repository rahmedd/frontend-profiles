<template lang="pug">
input(:placeholder="`Search by ${label}`" :value="value" @input="$emit('input', $event.target.value)")
</template>

<script>

export default {
	name: 'Search',
	props: {
		label: String,
		value: String
	}
}
</script>

<style scoped lang="scss">
input {
	width: 100%;
	padding: 15px;
	font-size: 25px;
	outline: none;
	border: none;
	border-bottom: 2px solid #D7D7D7;
	font-family: Raleway, Helvetica, Arial, sans-serif;
}
</style>
