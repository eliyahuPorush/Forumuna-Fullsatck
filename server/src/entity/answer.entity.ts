import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity()
export class Answer{
    @PrimaryGeneratedColumn()
    id: number ;

    @Column()
    content: string ;

    @Column({nullable: true,default: new Date().toLocaleDateString()})
    dateCreated: string ;

    @ManyToOne(() => User, user => user)
    user: number ;

    @ManyToOne(() => Post, post => post, { onDelete: "CASCADE"})
    post: number ;
}