import { RouterWrap } from "../../lib/routerwrap";
import { getAsync } from "../../lib/request"
export const router = new RouterWrap({ prefix: "/test" });

router.handle("post", "/post", async (ctx, next) => {
    let res = (ctx.request as any).body;
    ctx.body = { "你输入的信息为：": res.msg };
})

router.handle("get", "/get", async (ctx, next) => {
    ctx.body = "收到get请求";
})

router.handle("get", "/getother", async (ctx, next) => {
    let opt = {
        url: "http://192.168.0.108:3355/test/get"
    }
    let res = await getAsync(opt)
    ctx.body = "收到get请求" + res;
})

