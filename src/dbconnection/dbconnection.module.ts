import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConfig } from './dbconfig/dbconfig';
import { DataSource } from 'typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: getConfig,
            dataSourceFactory: async (options) => {
                const dataSource =  await new DataSource(options).initialize();
                return dataSource;
            },
        })
    ],
    exports: [TypeOrmModule]
})
export class DbconnectionModule {
}
