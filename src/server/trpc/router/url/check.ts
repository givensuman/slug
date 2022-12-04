import { publicProcedure } from "../../trpc";
import { z } from 'zod'
import { env } from "../../../../env/server.mjs";

export const check = publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input: { url } }) => {
        return await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${env.GOOGLE_API_KEY}`, {
            method: 'POST',
            body: JSON.stringify({
                client: {
                    clientId: "slug.given.rocks",
                    clientVersion: "1.0.0"
                },
                threatInfo: {
                    threatEntryTypes: ["URL"],
                    threatEntries: [{ url: url }]
                }
            })
        })
            .then(res => res.json())
    })
