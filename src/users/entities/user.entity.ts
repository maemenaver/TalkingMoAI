import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
} from "typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    MACAddress: string;

    @Column()
    message: string;

    @Column()
    threshold: number = 0;

    @Column()
    isConnected: boolean = false;

    constructor(MAC: string, message: string) {
        if (MAC && message) {
            this.MACAddress = MAC;
            this.message = message;
        }
    }
}
