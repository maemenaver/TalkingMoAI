import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Logger,
    LoggerService,
    Query,
} from "@nestjs/common";
import { ConfigService } from "./config/config.service";

@Controller("")
export class AppController {
    constructor(
        private readonly configService: ConfigService,
        @Inject(Logger) private readonly logger: LoggerService
    ) {}

    @Get("home")
    home(@Query("IP") IP: string, @Query("MAC") MAC: string) {
        try {
            return `${IP} / ${MAC}`;
        } catch (err) {
            this.logger.error(err, "AppController.home", "AppException");
            throw err;
        }
    }
}
