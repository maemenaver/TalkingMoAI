import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
    WinstonModule,
    utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const developmentOptions = {
    logger: WinstonModule.createLogger({
        levels: winston.config.npm.levels,
        level: "verbose",
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    nestWinstonModuleUtilities.format.nestLike()
                ),
            }),
        ],
    }),
    bodyParser: true,
    abortOnError: false,
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule, developmentOptions);

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        })
    );
    app.enableCors();
    app.listen(process.env.SERVER_PORT, "0.0.0.0");
}
bootstrap();
