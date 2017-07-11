import * as koa from "koa"
import winston = require("winston")
import { pgOpt } from "./config/postgres"
import { Sequelize, Options } from "sequelize"
import { init as initModel } from "./model"
import { init as initDeamon } from "./deamon"
import { config as logConfig } from "./config/winston"
import { setSeqz } from "./lib/global"
import { initRouter } from "./router"

async function initKoa(app: koa) {
    const convert = require('koa-convert')

    // TODO enable only on DEBUG mode
    const logger = require('koa-logger')
    app.use(convert(logger()))

    // 静态文件
    const path = require('path')
    const serve = require('koa-static')
    app.use(convert(serve(path.join(__dirname, '../public'))))

    // 跨域
    const cors = require('koa-cors')
    app.use(convert(cors({ origin: '*' })))

    // body解析
    const bodyParser = require('koa-bodyparser')
    app.use(convert(bodyParser()))

    // 文件上传
    const multer = require('koa-multer')
    //dest为临时文件位置，single为单个文件，用file提取，array为多个文件，使用files提取
    app.use(multer({ dest: '/tmp/' }).single("file"))

    app.on("error", (err: any) => winston.error("%s", err))
}

async function main() {
    const app = new koa()
    try {
        await Promise.all([initKoa, initResource].map(f => f(app)))
        await initRouter(app)
    } catch (e) {
        winston.error("init fail", e)
        process.exit(1)
    }

    // listen
    let port = parseInt(process.env.PORT) || 3355

    app.listen(port, () => console.log("listening on port", port))

    // handle uncaughtException
    process.on("uncaughtException", (err: Error) => winston.error("uncaughtException", err))
}

//-------------------------------------------------------------------------

async function initResource(app: koa) {
    winston.configure(logConfig) // 日志

    let seqz = new Sequelize(pgOpt.database, pgOpt.username, pgOpt.password, pgOpt.options as Options)   // postgres

    await initModel(seqz)   // database model
    setSeqz(seqz)
    Object.defineProperty(app.context, 'seqz', { get: () => seqz })   // app.context["seqz"] = seqz

    winston.info("initResource ok")
    await initDeamon() // init deamon
}

main()


