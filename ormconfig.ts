import { cwd } from 'process'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'admin',
    database: 'postgres',
    entities: [cwd() + '/src/**/*.entity.ts'],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrations: [cwd() + '/src/migrations/*.ts'],
    migrationsTableName: 'history'
})