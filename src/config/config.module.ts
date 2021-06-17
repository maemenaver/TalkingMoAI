import { Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigController } from "./config.controller";
import { UsersModule } from "src/users/users.module";

@Module({
    imports: [UsersModule],
    controllers: [ConfigController],
    providers: [ConfigService],
})
export class ConfigModule {}
