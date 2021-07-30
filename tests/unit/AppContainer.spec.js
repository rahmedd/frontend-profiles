import AppContainer from '../../src/components/AppContainer.vue'
import mockData from '../../mockData.json' // data from api is sorted

// Custom matcher
expect.extend({
	toContainObject (received, argument) {
		const pass = this.equals(received,
			expect.arrayContaining([
				expect.objectContaining(argument)
			])
		)
		if (pass) {
			return {
				message: () => (`expected ${this.utils.printReceived(received)} not to contain object ${this.utils.printExpected(argument)}`),
				pass: true
			}
		}
		else {
			return {
				message: () => (`expected ${this.utils.printReceived(received)} to contain object ${this.utils.printExpected(argument)}`),
				pass: false
			}
		}
	}
})

describe('test findNameInArr', function () {
	test('test exact first name', () => {
		const ret = AppContainer.methods.findNameInArr('clarke', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({ firstName: 'Clarke' })
	})

	test('test partial first name', () => {
		const ret = AppContainer.methods.findNameInArr('clark', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({ firstName: 'Clarke' })
	})

	test('test exact last name', () => {
		const ret = AppContainer.methods.findNameInArr('orton', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({ lastName: 'Orton' })
	})

	test('test partial last name', () => {
		const ret = AppContainer.methods.findNameInArr('rton', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({ lastName: 'Orton' })
	})

	test('test fullname', () => {
		const ret = AppContainer.methods.findNameInArr('laurens romanet', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({
			firstName: 'Laurens',
			lastName: 'Romanet'
		})
	})

	test('test partial full name', () => {
		const ret = AppContainer.methods.findNameInArr('ens roman', mockData.students)
		expect(ret.length).toBe(1)
		expect(ret).toContainObject({
			firstName: 'Laurens',
			lastName: 'Romanet'
		})
	})

	test('test multiple similar names', () => {
		const ret = AppContainer.methods.findNameInArr('in', mockData.students)
		expect(ret.length).toBe(2)
		expect(ret).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					firstName: 'Ingaberg'
				}),
				expect.objectContaining({
					firstName: 'Minnnie'
				})
			])
		)
	})
})

describe('test findTagInArr', function () {
	test('test tag', () => {
		const ret = AppContainer.methods.findTagInArr('abc', mockData.students)
		expect(ret.length).toBe(2)
		expect(ret).toContainObject({
			tags: ['abc']
		})
	})

	test('test tag on student with multiple tags', () => {
		const ret = AppContainer.methods.findTagInArr('def', mockData.students)
		expect(ret.length).toBe(2)
		expect(ret).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					tags: ['def']
				}),
				expect.objectContaining({
					tags: ['def', 'ghi']
				})
			])
		)
	})
})

describe('test search / both findTagInArr AND findNameInArr', function () {
	test('match tag AND name', () => {
		const ret = AppContainer.methods.search({ tag: 'abc', name: 'a' }, mockData.students)
		expect(ret.length).toBe(2)
		expect(ret).toContainObject({
			tags: ['abc']
		})
	})
})
