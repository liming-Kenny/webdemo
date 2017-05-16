import { RouterWrap } from "../../lib/routerwrap"

export const router = new RouterWrap({ prefix: "/users" })

// 登陆
router.handle("post", "/login", async (ctx, next) => {
    const { username, password } = (ctx.request as any).body


    ctx.body = { 'username': username, 'password': password }
})