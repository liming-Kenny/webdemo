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
    const { id, name, host, port, type, group, args } = (ctx.request as any).body

    let obj = {
        name: name,
        host: host,
        port: port,
        type: type,
        group: group,
        args: args,
    }

    if (!!id) {
        obj = { ...obj, id: id }
    }

    try {
        await api.getInstance().insertOne(obj as API)
        ctx.body = "success";
    } catch (e) {
        ctx.body = "faild"
    }
})

router.handle("get", "/group/:group", async (ctx, next) => {
    let group = ctx.params.group
    let res = await api.getInstance().findByGroup(group);
    ctx.body = res;
})

router.handle("delete", "/delete/:id", async (ctx, next) => {
    let id = ctx.params.id

    try {
        await api.getInstance().deleteById(id);
        ctx.body = "success";
    } catch (e) {
        ctx.body = "faild"
    }
})
