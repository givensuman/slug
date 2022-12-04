import { publicProcedure } from "../../trpc";
import { z } from 'zod'
import ogs from 'open-graph-scraper'

export const metadata = publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input: { url } }) => {
        const { error, result } = await ogs({ url: url })

        if (error) throw new Error(`❌ Error when accessing metadata for ${url}: ${error}`)

        return result
    })