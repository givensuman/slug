import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link"
import React, { useEffect, useState } from 'react'

import Spinner from "../components/Spinner";
import Button from "../components/Button";
import { FaRegCopy, FaAngleRight } from 'react-icons/fa'

import { trpc } from "../utils/trpc";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import { env } from "../env/client.mjs";

const Home: NextPage = () => {
  const [ input, setInput ] = useState("")
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const isValidUrl = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i') // fragment locator
    return !!pattern.test(url)
  }
  const inputIsValidUrl = isValidUrl(input)

  const { mutateAsync: submitUrl, data, isLoading } = trpc.db.add.useMutation()
  const handleSubmit = async () => {
    await submitUrl({ url: input })
  }


  const [ slug, setSlug ] = useState<string | null>(null)
  const resetData = () => {
    setSlug(null)
    setInput("")
  }
  useEffect(() => setSlug(data || null), [data])

  const [ _, setCopiedText ] = useCopyToClipboard()
  const copySlugToClipboard = () => setCopiedText(`${env.NEXT_PUBLIC_DOMAIN_URL}/${slug}`)

  return (
    <>

      <Head>
        <title>{`slug > link shortener`}</title>
      </Head>

      <main className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <h1 className="text-7xl font-bold mb-2 cursor-default">
          🐌 
          <span className=" bg-gradient-to-r from-fuchsia-400 to-purple-500 text-transparent bg-clip-text">
            slug
          </span>
        </h1>
        {!slug || isLoading ?
          // Input and submit button
          <div className="flex flex-col space-y-2">
            <input
              type="url"
              className="px-4 py-3 rounded-xl bg-stone-600 text-stone-200 text-xl focus:border-none focus:outline-none focus:ring-4 focus:ring-purple-500 transition-all focus:bg-stone-700"
              tabIndex={1}
              onChange={handleInputChange}
              placeholder="www.example.com"
            />
              <Button
                disabled={!inputIsValidUrl}
                onClick={handleSubmit}
                tabIndex={2}
                style={{
                  opacity: inputIsValidUrl ? '1' : '0',
                  userSelect: inputIsValidUrl ? 'auto' : 'none'
                }}
              >   
                {isLoading ? <Spinner /> : 'Shorten'}
              </Button>
          </div>
        :
          // Copy, visit, and start over buttons
          <div className="flex flex-col space-y-2 w-64">
            <div className="flex flex-row items-center space-x-2 w-full">
              <button 
                className="px-4 py-3 bg-slate-300 rounded-lg cursor-pointer hover:bg-slate-400 transition-all focus:ring-4 focus:ring-purple-500 flex flex-row items-center space-x-2 flex-grow"
                tabIndex={1}
              >
                <FaRegCopy className="text-2xl" />
                <h1 
                  className="text-bold text-2xl font-mono"
                  onClick={copySlugToClipboard}
                >
                  {slug}
                </h1>
              </button>
              <Link href={`/${slug}`}>
                <Button
                  className="rounded-full w-8 h-8 flex items-center justify-center"
                  tabIndex={2}
                >
                  <FaAngleRight className="text-2xl" />
                </Button>
              </Link>
            </div>
            <Button 
              onClick={resetData}
              tabIndex={3}
            >
              Start Over
            </Button>
          </div>
        }
      </main>
      
    </>
  );
};

export default Home;
