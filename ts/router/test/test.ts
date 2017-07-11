import { RouterWrap } from "../../lib/routerwrap"
import * as fs from "fs"
import { join } from "path"

export const router = new RouterWrap({ prefix: "/test" })

// 登陆
router.handle("post", "/login", async (ctx, next) => {
    const { username, password } = (ctx.request as any).body
    ctx.body = { 'username': username, 'password': password }
})

router.handle("post", "/upload", async (ctx, next) => {
    //single -> file   array -> files[*]
    const file = (ctx.req as any).file

    let des_file = join("public/upload", file.originalname)

    fs.rename(file.path, des_file, err => { // 移动临时文件并重命名
        if (err)
            console.error(err)
    })

    ctx.body = ""
})
