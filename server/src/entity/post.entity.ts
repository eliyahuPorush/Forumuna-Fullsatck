import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { User } from "./user.entity";


@Entity()
export class Post{
     
    @PrimaryGeneratedColumn()
    id: number ;

    @Column({length:150, nullable: true})
    title: string ;

    @Column({length: 2000, nullable: true})
    content: string ;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: number ;

    @Column({default: new Date().toLocaleDateString()})
    dateCreated: string ;


    @Column({nullable: true, default: 0})
    likes: number ;
    
    // @OneToMany(() => Answer, answer => answer.user)
    // answers: Answer[];

}