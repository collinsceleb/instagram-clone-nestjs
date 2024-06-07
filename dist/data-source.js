"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./users/entities/user.entity");
const post_entity_1 = require("./posts/entities/post.entity");
const configservice = new config_1.ConfigService();
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configservice.get('DB_HOST'),
    port: parseInt(configservice.get('DB_PORT')),
    username: 'postgres',
    password: 'Collinsceleb21&',
    database: configservice.get('DB_NAME'),
    synchronize: true,
    logging: false,
    entities: [user_entity_1.User, post_entity_1.Post],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map