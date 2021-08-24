import React from 'react'
import ActiveSeasonLabel from '../components/AssociationPage/ActiveSeasonLabel'

export default {
    title: 'components/Assocationpage/ActiveSeasonLabel',
    component: ActiveSeasonLabel,
    parameters: {},
}

const Template = (args) => <ActiveSeasonLabel {...args} />

export const Default = Template.bind({})

Default.args = {
    activeSeasons: 2,
}
