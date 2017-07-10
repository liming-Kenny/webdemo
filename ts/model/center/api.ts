import { DataTypes, Sequelize } from "sequelize"
import { ModelBase } from "../modelbase"

const [table] = ["api"]
const modelName = `${table}`
export const defineFunction = function (sequelize: Sequelize) {
    api.getInstance(sequelize)
    return sequelize.define(modelName, {
        name: {
            primaryKey: true,
            type: DataTypes.CHAR(500)
        },
        type: DataTypes.CHAR(20),
        args: DataTypes.CHAR(1000),
    }, {
            timestamps: false,
            freezeTableName: true,
            tableName: table,
        })
}

export class api extends ModelBase {
    private static instance: api
    private constructor(seqz: Sequelize, modelName: string) {
        super(seqz, modelName)
    }

    public static getInstance(seqz: Sequelize = undefined) {
        if (!api.instance)
            api.instance = new api(seqz, modelName)
        return api.instance
    }

    public async getAll() {
        let res = await this.model().findAll()
        return res ? res.map(r => r.get()) : []
    }
}
