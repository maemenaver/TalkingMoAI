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

            // pingpong 서버로 메시지를 보냅니다.
            // 리액션 메시지 및 이미지을 반환합니다.
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

            let resultPingpong = [];

            // 메시지의 개수 만큼 처리합니다.
            for (let i = 0; i < pingpong.data.response.replies.length; i++) {
                // 해당 메시지의 type을 확인합니다.
                const type = pingpong.data.response.replies[i].type;
                switch (type) {
                    // type이 text일 경우
                    case "text":
                        // type과 text를 resultPingpong array에 추가합니다.
                        const text = pingpong.data.response.replies[i].text;
                        resultPingpong = [...resultPingpong, { type, text }];

                        // TTS 서비스 함수를 호출합니다.
                        this.configService.textToSpeech(text);
                        break;

                    // type이 image일 경우
                    case "image":
                        // type과 (image)url을 resultPingpong array에 추가합니다.
                        const url = pingpong.data.response.replies[i].image.url;
                        resultPingpong = [...resultPingpong, { type, url }];
                        break;
                }
            }

            console.log(resultPingpong);

            // 클라이언트로 resultPingpong obejct[]를 전송합니다
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
