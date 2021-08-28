import React from 'react'
import Head from 'next/head'
import { useMediaQuerySSR } from 'hooks'
import { Template, Container } from 'components/Dashboard'

const index = () => {
    const isDesktop = useMediaQuerySSR(940)

    return (
        <Template>
            <Container heading="Stefan's teams"></Container>
        </Template>
    )
}

export default index
