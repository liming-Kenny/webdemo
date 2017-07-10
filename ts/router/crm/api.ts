import { RouterWrap } from "../../lib/routerwrap";
//import { postAsync, getAsync } from "../../lib/request"
import { api } from "../../model/api/api"
import { API } from "../../model/entity/api"

export const router = new RouterWrap({ prefix: "/api" });

router.handle("get", "/all", async (ctx, next) => {
    let res = await api.getInstance().getAll();
    ctx.body = res;
})

router.handle("post", "/add", async (ctx, next) => {
    console.log(ctx)
    const { name, host, port, type, group, args } = (ctx.request as any).body
    let obj = {
        name: name,
        host: host,
        port: port,
        type: type,
        group: group,
        args: args,
    }
    let res = await api.getInstance().insertOne(obj as API)
    ctx.body = res;
})

router.handle("get", "/group/:group", async (ctx, next) => {
    let group = ctx.params.group
    let res = await api.getInstance().findByGroup(group);
    ctx.body = res;
})
