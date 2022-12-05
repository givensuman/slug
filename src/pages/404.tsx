import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

import Button from '../components/Button'

const NotFound: React.FC = () => {
    return (<>

        <Head>
            <title>{`slug > 404`}</title>
        </Head>

        <main className="min-h-screen w-full flex flex-col items-center justify-center space-y-4 p-4">
            <h1 className="text-slate-200 text-4xl font-bold">
                You look a little lost...
            </h1>
            <h3 className="text-slate-300 text-2xl">
                {"Frankly, I don't know how you got here either"}
            </h3>
            <Link href="/">
                <Button>
                    Go To Homepage
                </Button>
            </Link>
        </main>
        
    </>)
}

export default NotFound