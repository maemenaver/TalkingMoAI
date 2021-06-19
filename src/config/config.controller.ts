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
    HttpService,
} from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";

@Controller("config")
export class ConfigController {
    constructor(
        private readonly configService: ConfigService,
        private httpService: HttpService
    ) {}

    @Post()
    create(@Body() createConfigDto: CreateConfigDto) {
        return this.configService.create(createConfigDto);
    }

    @Get()
    findAll() {
        return this.configService.findAll();
    }

    @Post("tts")
    async tts(@Body() { message, userID }) {
        try {
            if (!message || !userID) {
                throw new HttpException(
                    "Not found query",
                    HttpStatus.BAD_REQUEST
                );
            }

            const pingpong = await this.httpService
                .post(
                    `${process.env.PINGPONG_URL}/${userID}`,
                    {
                        request: {
                            query: message,
                        },
                    },
                    {
                        headers: {
                            Authorization: `Basic ${process.env.PINGPONG_AUTHORIZATION}`,
                            "Content-Type": "application/json",
                        },
                    }
                )
                .toPromise();

            // console.dir(pingpong.data.response, {
            //     maxArrayLength: null,
            //     maxStringLength: null,
            // });

            let resultPingpong = [];
            for (let i = 0; i < pingpong.data.response.replies.length; i++) {
                const type = pingpong.data.response.replies[i].type;
                switch (type) {
                    case "text":
                        const text = pingpong.data.response.replies[i].text;
                        resultPingpong = [...resultPingpong, { type, text }];
                        this.configService.textToSpeech(text);
                        break;

                    case "image":
                        const url = pingpong.data.response.replies[i].image.url;
                        resultPingpong = [...resultPingpong, { type, url }];
                        break;
                }
            }

            console.log(resultPingpong);

            return resultPingpong;
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
