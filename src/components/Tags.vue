<template lang="pug">
div(class="tags")
	template(v-for="tag in tags")
		button(@click="removeTag") {{ tag }}
</template>

<script>

export default {
	name: 'Tags',
	props: {
		tags: Array
	},
	data: () => {
		return {
		}
	},
	methods: {
		removeTag (idx) {
			this.$emit('removeTag', idx)
		}
	}
}
</script>

<style scoped lang="scss">
.tags {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
}

.tags button {
	border: none;
	border-radius: 3px;
	background-color: #E0E0E0;
	padding: 8px;
	margin-right: 6px;
	margin-bottom: 6px;
}
</style>
