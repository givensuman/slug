import { router } from "../../trpc";

import { check } from './check'
import { metadata } from "./metadata";

export const urlRouter = router({
    check: check,
    metadata: metadata
})