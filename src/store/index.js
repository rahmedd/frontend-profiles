import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		students: [],
		expiry: new Date() // TODO
	},
	mutations: {
		SetStudents (state, arr) {
			state.students = arr
		},

		AddTag (state, { studentIdx, tagContent }) {
			state.students[studentIdx].tags.push(tagContent)
		},

		RemoveTag (state, { tagIdx, studentIdx }) {
			state.students[studentIdx].tags.splice(tagIdx, 1)
		}
	},
	actions: {
		async getStudents ({ commit }) {
			try {
				// fetch deta and assign to students
				const res = await axios.get('https://api.hatchways.io/assessment/students')
				const students = res.data.students
				students.forEach(student => { student.tags = [] }) // add tags property
				commit('SetStudents', students)
			}
			catch (ex) {
				console.log(ex)
			}
		}
	},
	getters: {
		GetStudents: (state) => state.students
	},
	modules: {
	}
})
