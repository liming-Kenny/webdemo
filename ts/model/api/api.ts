import { DataTypes, Sequelize } from "sequelize"
import { ModelBase } from "../modelbase"
import { API } from "../entity/api"

const [schema, table] = ["api", "api"]
const modelName = `${schema}.${table}`
export const defineFunction = function (sequelize: Sequelize) {
    api.getInstance(sequelize)
    return sequelize.define(modelName, {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.CHAR(128),
        host: DataTypes.CHAR(128),
        port: DataTypes.CHAR(64),
        type: DataTypes.CHAR(64),
        group: DataTypes.CHAR(64),
        args: DataTypes.CHAR(512),
        created: DataTypes.TIME,
        modified: DataTypes.TIME,
        spare1: DataTypes.CHAR(128),
        spare2: DataTypes.CHAR(128),
        ext: DataTypes.JSONB,
    }, {
            timestamps: false,
            freezeTableName: true,
            schema: schema,
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

    public async insertOne(api: API) {
        let res = await this.model().upsert(api)
        return res
    }

    public async findByGroup(group: string) {
        let res = await this.model().findAll({ where: { group: group } })
        return res ? res.map(r => r.get()) : []
    }

    public async deleteById(id: number) {
        let res = await this.model().destroy({ where: { id: id } })
        return res
    }
}
