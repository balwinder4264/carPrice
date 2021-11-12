import {AfterInsert,AfterRemove,AfterUpdate, Entity, Column,PrimaryGeneratedColumn} from "typeorm";
//type orm automattically create table
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;
    
    @Column()
    password:string;
    @AfterInsert()
    logInsert(){
        console.log('inserted user with ',this.id)
    };
    @AfterUpdate()
    logupdate(){
        console.log('updated user with ',this.id)
    }
    @AfterRemove()
    logRemove(){
        console.log('removed user with ',this.id)
    }
}