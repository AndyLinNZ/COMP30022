import React from 'react'
import AssociationCard from 'components/AssociationCard'
import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                background: '#EBEBEB',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                }}
            >
                <AssociationCard
                    name={
                        'National Basketball Association dasd adassadsada dsad'
                    }
                    org="Basketball Victoria"
                    activeSeasons={2}
                    icon={null}
                />
            </div>
        </div>
    )
}
