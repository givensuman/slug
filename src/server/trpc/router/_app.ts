import { router } from "../trpc";

import { dbRouter } from "./db";
import { urlRouter } from "./url"

export const appRouter = router({
  db: dbRouter,
  url: urlRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
