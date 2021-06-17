import { Injectable } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
import { UsersService } from "src/users/users.service";
import { CreateConfigDto } from "./dto/create-config.dto";
import { UpdateConfigDto } from "./dto/update-config.dto";
import spawnAsync from "@expo/spawn-async";
import { getMongoManager } from "typeorm";

@Injectable()
export class ConfigService {
    constructor(private usersService: UsersService) {}

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
}
