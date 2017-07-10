import { RouterWrap } from "../../lib/routerwrap"
import fs = require('fs')
import { join } from "path"
// import formidable = require('formidable')
// import { send } from "koa-send"
// import request = require("request")

export const router = new RouterWrap({ prefix: "/file" })

router.handle("post", "/", (ctx, next) => {
    const file = (ctx.req as any).file
    try {
        let des_file = join("public\\upload", file.originalname)
        // fs.readFile(file.path, function (err: any, data: any) { // 临时文件并未移除
        //     fs.writeFile(des_file, data, err => {
        //         if (err) console.error(err)
        //     })
        // })

        fs.rename(file.path, des_file, err => { // 移动临时文件并重命名
            if (err) console.error(err)
        })
        ctx.body = { msg: "上传成功" }
    } catch (error) {
        ctx.body = { msg: "上传失败" }
    }
})
