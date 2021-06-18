import { HttpModule, Module } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { ConfigController } from "./config.controller";
import { UsersModule } from "src/users/users.module";
import { BullModule } from "@nestjs/bull";
import { ConfigProcessor } from "./config.processor";

@Module({
    imports: [
        BullModule.registerQueue({
            name: "meeting",
            defaultJobOptions: {
                removeOnComplete: true,
            },
        }),
        UsersModule,
        HttpModule,
    ],
    controllers: [ConfigController],
    providers: [ConfigService, ConfigProcessor],
    exports: [ConfigService],
})
export class ConfigModule {}
