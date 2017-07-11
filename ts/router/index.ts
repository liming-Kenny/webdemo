import * as koa from "koa"
import { stat } from "fs"
import { join } from "path"
import winston = require("winston")
import { promisify } from "bluebird"

export async function initRouter(app: koa) {
    const statAsync = promisify(stat)

    let paths = [
<<<<<<< HEAD
        './test/test',
=======
        './crm/api',
>>>>>>> 5ce9494beed87c8378a1b423d8eacbd276df843b
    ]

    await Promise.all(paths.map(path => statAsync(join(__dirname, path) + ".js")))
    paths.forEach(path => app.use(require(path).router.routes()))
    winston.info("initRouter ok")
}
