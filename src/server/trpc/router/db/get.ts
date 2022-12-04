import { publicProcedure } from "../../trpc";
import { z } from 'zod'

export const get = publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input: { slug } }) => {
        const res = await ctx.prisma.slug.findFirst({
            where: {
                slug: { equals: slug }
            }
        })
        if (!res || !res.url) throw new Error(`❌ No entry in database matched ${slug}`)

        return res.url
    })