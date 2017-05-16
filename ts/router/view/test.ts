import { RouterWrap } from "../../lib/routerwrap"
let formidable = require('formidable')
let logger = require('koa-logger');
let serve = require('koa-static');
let parse = require('co-busboy');
let koa = require('koa');
let fs = require('fs');
let app = new koa();
let os = require('os');
let path = require('path');


export const router = new RouterWrap({ prefix: "/test" })


router.handle("post", "/upload", async (ctx, next) => {
    let form = new formidable.IncomingForm();
    form.parse(ctx.request, function (err: any, fields: any, files: any) {
        console.log(fields)
        console.log(files)
    })
})
