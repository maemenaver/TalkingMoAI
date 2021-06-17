import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";

@Controller("config")
export class ConfigController {
    constructor(private readonly configService: ConfigService) {}

    @Post()
    create(@Body() createConfigDto: CreateConfigDto) {
        return this.configService.create(createConfigDto);
    }

    @Get()
    findAll() {
        return this.configService.findAll();
    }

    @Get("tts")
    async tts(@Query("message") message: string) {
        try {
            if (!message) {
                console.log(message);
                throw new HttpException(
                    "Not found meesage query",
                    HttpStatus.BAD_REQUEST
                );
            }

            this.configService.textToSpeech(message);

            return message;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.configService.findOne(+id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() updateConfigDto: UpdateConfigDto) {
        return this.configService.update(+id, updateConfigDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.configService.remove(+id);
    }
}
