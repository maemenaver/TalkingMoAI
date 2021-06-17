import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { getMongoManager } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    async create(MAC: string, message: string) {
        const manager = getMongoManager("mongo");

        let user;
        const isExist = await this.findOne(MAC);
        switch (!!isExist) {
            case true:
                isExist.message = message;
                user = isExist;
                break;

            case false:
                user = new User(MAC, message);
                break;
        }
        return await manager.save(user);
    }

    async findAll() {
        const manager = getMongoManager("mongo");

        const user = await manager.find(User);

        return user;
    }

    async remove(MAC: string) {
        const manager = getMongoManager("mongo");

        const isExist = await this.findOne(MAC);
        if (!isExist) {
            throw new HttpException(
                "Not Already exist MACAddress",
                HttpStatus.CONFLICT
            );
        }

        return await manager.remove(isExist);
    }

    async findOne(MACAddress: string) {
        const users = await this.findAll();
        let user: User = null;
        for (let i = 0; i < users.length; i++) {
            const isExist = users[i].MACAddress == MACAddress;
            if (isExist) {
                user = users[i];
                break;
            }
        }

        return user;
    }
}
