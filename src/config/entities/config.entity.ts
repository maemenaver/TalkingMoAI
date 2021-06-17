import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
} from "typeorm";

@Entity()
export class Config {
    @ObjectIdColumn()
    id: ObjectID;

    @CreateDateColumn()
    createdAt: Date;
}
