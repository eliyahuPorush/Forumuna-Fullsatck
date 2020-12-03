import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";


@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default: new Date().toLocaleDateString()})
    date_of_joined: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable:true})
    alies: string;

    @OneToMany(() => Post, post => post.user)
    @JoinColumn()
    posts: Post[] ;

    @Column({nullable:true})
    profileImagePath: string;

    @Column({default: 0})
    numberOfPosts: number;

    
    // @OneToMany(() => Answer, answer => answer.user)
    // @JoinColumn()
    // answers: Answer[] ;
}