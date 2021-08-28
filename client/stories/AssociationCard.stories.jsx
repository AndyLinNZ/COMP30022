import React from 'react'
import AssociationCard from '../src/components/AssociationPage/AssociationCard'

export default {
    title: 'components/Assocationpage/AssociationCard',
    component: AssociationCard,
    parameters: {},
}

const Template = (args) => <AssociationCard {...args} />

export const Default = Template.bind({})

Default.args = {
    name: '',
    org: '',
    activeSeasons: 0,
    icon: null,
}

export const Populated = Template.bind({})

Populated.args = {
    name: 'National basketball Association',
    org: 'NBA',
    activeSeasons: 2,
    icon: 'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fnba.png',
}
