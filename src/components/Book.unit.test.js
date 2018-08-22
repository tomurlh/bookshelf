import React from 'react'
import { shallow } from 'enzyme'
import Book from './Book'
import Book from '../App'

describe('<Book />', () => {
	it('should render four <Button /> components', () => {
		const wrapper = shallow(<Book />)
		expect(wrapper.find(Button)).to.have.length(4)
	})
})