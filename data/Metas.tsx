import Head from 'next/head'

import { ReactNode } from 'react'

export const Meta = (props: { title: string }): ReactNode => {
    const { title } = props

    return (
        <Head>
            <title>{title}</title>

            <link rel="icon" href="/favicon.ico" />

            <meta name="robots" content="noindex" />
        </Head>
    )
}