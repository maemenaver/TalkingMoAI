import { Injectable } from "@nestjs/common";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { TTSDataDto } from "./dto/processor-config.dto";

@Injectable()
export class ConfigService {
    constructor(@InjectQueue("meeting") private readonly configQueue: Queue) {}

    create(createConfigDto: CreateConfigDto) {
        return "This action adds a new config";
    }

    findAll() {
        return `This action returns all config`;
    }

    findOne(id: number) {
        return `This action returns a #${id} config`;
    }

    update(id: number, updateConfigDto: UpdateConfigDto) {
        return `This action updates a #${id} config`;
    }

    remove(id: number) {
        return `This action removes a #${id} config`;
    }

    async textToSpeech(message: string) {
        console.log("tts service test");

        const result = this.configQueue.add("textToSpeech", {
            message,
        } as TTSDataDto);
        return result;
    }
}
