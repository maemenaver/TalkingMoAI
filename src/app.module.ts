import { Logger, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { ConfigModule as EnvironmentModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { User } from "./users/entities/user.entity";
import { ConfigModule } from "./config/config.module";
import { Config } from "./config/entities/config.entity";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bull";

@Module({
    imports: [
        EnvironmentModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            isGlobal: true,
        }),
        ScheduleModule.forRoot(),
        TypeOrmModule.forRoot({
            name: "mongo",
            type: "mongodb",
            url: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}`,
            database: "saruru",
            entities: [User, Config],
            ssl: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            keepConnectionAlive: true,
        }),
        BullModule.forRoot({
            redis: {
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
            },
        }),
        UsersModule,
        ConfigModule,
    ],
    controllers: [AppController],
    providers: [Logger],
})
export class AppModule {}
