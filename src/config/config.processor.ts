import { InjectQueue, Process, Processor } from "@nestjs/bull";
import { Job, Queue } from "bull";
import * as textToSpeech from "@google-cloud/text-to-speech";
import * as util from "util";
import * as fs from "fs";
import { TTSDataDto } from "./dto/processor-config.dto";

@Processor("meeting")
export class ConfigProcessor {
    constructor(@InjectQueue("meeting") private readonly queue: Queue) {}

    @Process("textToSpeech")
    async textToSpeech(job: Job) {
        try {
            const { message }: TTSDataDto = job.data;
            console.log("tts Test");

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
            await player.play({ path: "./output.wav", sync: true });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
