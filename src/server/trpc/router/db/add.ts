import { publicProcedure } from "../../trpc";
import { z } from 'zod'
import { nanoid } from 'nanoid'
 
export const add = publicProcedure
  .input(z.object({ url: z.string() }))
  .mutation(async ({ ctx, input: { url } }) => {

    // Format url
    if (!/^https?:\/\//i.test(url)) {
      url =  'http://' + url
    }

    // Test if url already exists in database
    const urlExists = await ctx.prisma?.slug?.findMany({
      where: {
        url: { equals: url }
      }
    })

    if (urlExists[0]) {
      return urlExists[0].slug
    }

    // Url not in database, create slug
    let slug = nanoid(10)

    // Test if slug already exists in database
    let slugExists = await ctx.prisma?.slug?.findMany({
      where: {
        slug: { equals: slug }
      }
    })

    while (slugExists.length > 0) {
      slug = nanoid(10)
      slugExists = await ctx.prisma?.slug?.findMany({
        where: {
          slug: { equals: slug }
        }
      })
    }

    // Add url/slug combination to database
    try {
      await ctx.prisma?.slug?.create({
        data: {
          url: url,
          slug: slug
        }
      })

      return slug
    } catch (err) {
      console.error(err)
    }
  })