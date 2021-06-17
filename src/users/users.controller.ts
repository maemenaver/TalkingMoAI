import {
    Controller,
    Get,
    Post,
    Body,
    Put,
    Param,
    Delete,
    Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("/create")
    async create(@Query("MAC") MAC: string, @Query("message") message: string) {
        return await this.usersService.create(MAC, message);
    }

    @Get()
    async findAll() {
        return await this.usersService.findAll();
    }

    @Get(":MAC")
    findOne(@Param("MAC") MAC: string) {
        return this.usersService.findOne(MAC);
    }

    @Get("/delete")
    remove(@Query("MAC") MAC: string) {
        return this.usersService.remove(MAC);
    }
}
