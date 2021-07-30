<template lang="pug">
div(class="student-container")
	img(:src="student.pic" class="student-photo")

	div(class="student-info")
		h1 {{ `${student.firstName.toUpperCase()} ${student.lastName.toUpperCase()}` }}

		p Company: {{ student.email }}
		p Email: {{ student.company }}
		p Skill: {{ student.skill }}
		p Average: {{ calculateAverage(student.grades) }}%

		div(v-if="isExpanded" class="dropdown")
			p(v-for='(grade, index) in student.grades') Test {{ index }}: {{ grade }}%

		div(class="tags-container")
			Tags(:tags="student.tags" @removeTag="removeTag")
			InputField(label="Add a tag" @userInput="addTag")

	button.drop-btn
		font-awesome-icon(v-if="isExpanded" @click="isExpanded = false" icon="minus")
		font-awesome-icon(v-else @click="isExpanded = true" icon="plus")
</template>

<script>
import Tags from '@/components/Tags.vue'
import InputField from '@/components/InputField.vue'

export default {
	name: 'Student',
	components: {
		Tags,
		InputField
	},
	props: {
		student: Object
	},
	data: () => {
		return {
			isExpanded: false
		}
	},
	methods: {
		calculateAverage (arr) {
			let sum = 0
			arr.forEach(elm => { sum += parseInt(elm) })
			return sum / arr.length
		},

		addTag (tagContent) {
			const studentIdx = this.student.id - 1
			tagContent = tagContent.toLowerCase()
			this.$store.commit('AddTag', { studentIdx, tagContent })
		},

		removeTag (tagIdx) {
			const studentIdx = this.student.id - 1
			this.$store.commit('RemoveTag', { tagIdx, studentIdx })
		}
	}
}
</script>

<style lang="scss">
.student-container {
	display: flex;
	align-items: center;
	border-bottom: 1px solid #dcdcdc;
	padding: 20px;
}

.student-photo {
	width: 130px;
	height: 130px;
	border-radius: 50%;
	border: 1px solid #E1E1E1;
	// margin-top: 30px;
	margin-right: 20px;
	margin-bottom: auto;
}

// indentation
.student-info > * {
	margin-left: 30px;
	line-height: .7;
}

// title/name
.student-info > h1 {
	margin: 0;
	color: black;
	font-weight: 800;
}

.drop-btn {
	background: none;
	border: none;
	font-size: 30px;
	margin-left: auto;
	margin-bottom: auto;
	color: #AAAAAA;
}

.drop-btn:hover {
	color: grey;
}

.dropdown {
	padding-top: 2px;
}

.tags-container input {
	padding: 8px;
	border: none;
	outline: none;
	border-bottom: 1px solid #DDDDDD;
}

</style>
