import { useRouter } from 'next/router'
import React, { useState, useEffect, Suspense } from 'react'
import { useRef } from 'react'

import Spinner from '../components/Spinner'
import Button from '../components/Button'
import { FaGlobe } from 'react-icons/fa'

import { trpc } from '../utils/trpc'

const Slug: React.FC = () => {

    const router = useRouter()
    const { slug } = router.query

    const { data: url, isLoading: urlDataIsLoading } = trpc.db.get.useQuery({ slug: slug as string }, {
        onError: err => {
            console.error(err)
            router.push('/404')
        }
    })

    const { data: urlValidation, isLoading: validationIsLoading } = trpc.url.check.useQuery({
        url: url as string
    }, { enabled: !!url })
    const urlIsMalicious: boolean = (urlValidation && Object.keys(urlValidation).length > 0)

    const { data: metadata, isLoading: metadataIsLoading }: {
        data?: {
            favicon: string
            ogDescription: string,
            ogImage: { url: string },
            ogTitle: string,
            ogUrl: string
        },
        isLoading: boolean
    } = trpc.url.metadata.useQuery({
        url: url as string
    }, { enabled: !!url })

    const pageIsLoading: boolean = (urlDataIsLoading || validationIsLoading || metadataIsLoading)

    const [ timer, setTimer ] = useState(10)
    const countdownRef = useRef<any>(null)

    useEffect(() => {
        if (!pageIsLoading && !countdownRef.current) {
            countdownRef.current = setInterval(() => {
                setTimer(state => state - 1)
            }, 1000)
        }
        return () => clearInterval(countdownRef.current)
    }, [pageIsLoading])

    useEffect(() => {
        if (timer < 1 && !urlIsMalicious) {
            router.push(url as string)
        }
    }, [timer])

    if (pageIsLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <Spinner className="text-fuchsia-400" />
        </div>
    )

    if (pageIsLoading && (!metadata || !urlValidation)) return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-slate-300 text-3xl mb-4">No site data found</h1>
            <Button>Continue to {url}</Button>
        </div>
    )

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">

            {metadata && <>
            {!urlIsMalicious && <h1 className="text-4xl text-slate-300 mb-12">Redirecting you in {timer}</h1>}
            <div
                className="bg-slate-200 rounded-md p-4 shadow-lg cursor-pointer max-w-sm"
                onClick={() => router.push(url as string)}
            >
                <Suspense fallback={<>
                    <div className="w-full h-64 mb-4 bg-slate-400 rounded-md animate-pulse" />
                </>}>
                    {metadata.ogImage?.url 
                    ?
                        <img 
                            src={metadata?.ogImage.url}
                            alt={`${metadata.ogTitle} banner`}
                            className="w-full object-cover mb-4 h-64 rounded-md"
                        />
                    : 
                        <div className="w-full h-64 mb-4 bg-slate-400 rounded-md animate-pulse" />
                    }
                </Suspense>
                <h1 className="font-bold text-4xl text-gray-600">
                    {metadata.ogTitle ?? 'No title provided'}
                </h1>
                <p className="text-gray-600 mb-4">
                    {metadata.ogDescription ?? 'No description provided'}
                </p>
                <h1 className="text-gray-500 text-md flex flex-row space-x-2 items-center">
                    {metadata.favicon 
                    ?
                        <img
                            src={metadata.favicon} 
                            alt={`${metadata.ogTitle} favicon`} 
                            className="object-contain mt-1 max-h-4"
                        />
                    : 
                        <FaGlobe className="mt-1 max-h-4" />
                    }
                    <a href={url}>
                        {url}
                    </a>
                </h1>
                </div>
            </>}

            {urlIsMalicious &&
                <div className="bg-red-100 rounded-lg py-5 px-6 mb-3 mx-4 mt-4 text-base text-red-700 flex items-center" role="alert">
                    This link has been flagged as potentially malicious. Proceed with caution.
                </div>
            }

        </main>
    )
}

export default Slug