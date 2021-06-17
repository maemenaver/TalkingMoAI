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
import * as textToSpeech from "@google-cloud/text-to-speech";
import * as util from "util";
import * as fs from "fs";

@Controller("")
export class AppController {
    constructor(@Inject(Logger) private readonly logger: LoggerService) {}

    @Get("home")
    home(@Query("IP") IP: string, @Query("MAC") MAC: string) {
        try {
            return `${IP} / ${MAC}`;
        } catch (err) {
            this.logger.error(err, "AppController.home", "AppException");
            throw err;
        }
    }

    @Get("")
    async main(@Query("message") message: string) {
        try {
            if (!message) {
                console.log(message);
                throw new HttpException(
                    "Not found meesage query",
                    HttpStatus.BAD_REQUEST
                );
            }

            const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
                input: { text: message },
                voice: {
                    languageCode: "ko-KR",
                    name: "ko-KR-Wavenet-C",
                },
                audioConfig: {
                    effectsProfileId: ["small-bluetooth-speaker-class-device"],
                    audioEncoding: "LINEAR16",
                },
            };

            const client = new textToSpeech.TextToSpeechClient({
                keyFilename: "./talkingmoai-8d4204346eed.json",
            });
            const [response] = await client.synthesizeSpeech(request);

            const writeFile = util.promisify(fs.writeFile);
            await writeFile("output.wav", response.audioContent, "binary");

            console.log("Audio content written to file: output.wav");

            const player = require("node-wav-player");
            player
                .play({ path: "./output.wav" })
                .then(() => {
                    console.log(
                        "The wav file started to be played successfully."
                    );
                })
                .catch((error) => {
                    console.error(error);
                });

            return message;
        } catch (err) {
            this.logger.error(err, "AppController.home", "AppException");
            throw err;
        }
    }
}
