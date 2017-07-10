import { RouterWrap } from "../../lib/routerwrap";
//import { postAsync, getAsync } from "../../lib/request"
import { api } from "../../model/center/api"
export const router = new RouterWrap({ prefix: "/api" });

router.handle("get", "/all", async (ctx, next) => {
    let res = await api.getInstance().getAll();

    ctx.body = res;
})



