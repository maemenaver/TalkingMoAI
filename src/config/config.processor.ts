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
            // 처리할 메시지를 가져옵니다.
            const { message }: TTSDataDto = job.data;

            console.log("tts Test");

            // Google Cloud Platform에 보낼 request값을 정의합니다.
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

            // Google Cloud Platform TextToSpeechClient 객체를 선언합니다.
            const client = new textToSpeech.TextToSpeechClient({
                // Google Cloud Platform 인증 키를 가져옵니다.
                keyFilename: "./talkingmoai-8d4204346eed.json",
            });

            // TTS request를 서버에 보내고 결과를 받습니다.
            const [response] = await client.synthesizeSpeech(request);

            // 가져온 TTS response의 오디오를 output.wav로 저장합니다.
            const writeFile = util.promisify(fs.writeFile);
            await writeFile("output.wav", response.audioContent, "binary");

            console.log("Audio content written to file: output.wav");

            // output.wav 사운드 파일을 재생합니다.
            const player = require("node-wav-player");
            await player.play({ path: "./output.wav", sync: true });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
}
