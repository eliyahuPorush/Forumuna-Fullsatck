import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";




@Entity()
export class PrivateMessage{
    

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user)
    sender: number;

    @ManyToOne(() => User, user => user)
    receiver: number;

    @Column({nullable: false})
    messageContent: string;

    @Column({default: new Date().toLocaleDateString()})
    dateCreated: string ;

    @Column({nullable: true, default:false})
    receiverWatch: boolean;
}