<template lang="pug">
	div(class="app-container")
		div(class="search-container")
			Search(label='name' :value="name" @input="name = $event")
			Search(label="tag" :value="tag" @input="tag = $event")

		StudentCard(v-for='student in students' :key='student.id' :student="student")
		h2(class="not-found" v-if="!students.length") No students found
</template>

<script>
import StudentCard from '@/components/StudentCard.vue'
import Search from '@/components/Search.vue'
import { debounce } from '../helpers'

export default {
	name: 'AppContainer',
	components: {
		StudentCard,
		Search
	},
	props: {},
	data: () => {
		return {
			students: [],
			name: '',
			tag: ''
		}
	},
	methods: {
		// pass in query and array of students
		findNameInArr (query, students) {
			if (!query) {
				return students
			}

			const result = students.filter(student => {
				query = query.toLowerCase()

				// case-insensitve AND searches both names
				const fn = student.firstName.toLowerCase()
				const ln = student.lastName.toLowerCase()
				const joinedName = fn.concat(' ', ln)

				if (joinedName.includes(query)) {
					return true
				}

				return false
			})

			return result
		},

		// pass in query and array of students
		findTagInArr (query, students) {
			if (!query) {
				return students
			}

			const result = students.filter(student => {
				query = query.toLowerCase()
				const tags = student.tags
				if (tags.includes(query)) {
					return true
				}
				return false
			})

			return result
		},

		// params are primarily for testing
		search (queries = { tag: this.tag, name: this.name }, students = this.$store.getters.GetStudents) {
			const filteredByTag = this.findTagInArr(queries.tag, students)
			const filteredByName = this.findNameInArr(queries.name, filteredByTag)
			this.students = filteredByName

			return this.students
		}
	},
	watch: {
		name: debounce(function () {
			this.search()
		}, 500),

		tag: debounce(function () {
			this.search()
		}, 500)
	},
	mounted: async function () {
		// get students on component load and set them
		await this.$store.dispatch('getStudents')
		this.students = this.$store.getters.GetStudents
	}
}
</script>

<style scoped lang="scss">
.app-container {
  width: 800px;
  height: 600px;
  border-radius: 10px;
  margin: 100px auto;
  box-shadow: 0 0 10px rgba(0,0,0,10%);
  // remove scrollbar
  overflow: hidden;
  -ms-overflow-style: none; /* for Internet Explorer, Edge */
  scrollbar-width: none; /* for Firefox */
  overflow-y: scroll;
  background: white;
}

// remove scrollbar on webkit
.app-container::-webkit-scrollbar {
  display: none; /* for Chrome, Safari, and Opera */
}

.search-container {
  width: 98%;
  margin: 0 auto;
}

.not-found {
	margin-left: 20px;
}
</style>
