import { router } from "../../trpc";

import { add } from './add'
import { get } from './get'

export const dbRouter = router({
    add: add,
    get: get
})