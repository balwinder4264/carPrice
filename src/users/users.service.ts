import { Injectable,NotFoundException } from '@nestjs/common';
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from './user.entity'

//bussiness logic 
//makqe use of user repository which is created using orm
@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo : Repository<User>){ }
        create(email:string,password:string){
            //create function store info in instance
            const user = this.repo.create({email,password});
            //save user for actual save
            return this.repo.save(user);
        }
        findOne(id:number){
            return this.repo.findOne(id);
        }
        find(email:string){
            return this.repo.find({email});
        }
       async update(id:number,attrs:Partial<User>){
            const user = await this.findOne(id);
            if(!user){
                throw new NotFoundException('User not found');
            }
            Object.assign(user,attrs);
            return this.repo.save(user);
        }
       async remove(id:number){
            const user =await this.repo.findOne(id);
            if(!user){
                throw new NotFoundException('User not found');
            }
            return this.repo.remove(user)
        }
}

// bussines logic
//Repostory automatically created 
// we  Repository in service save info