import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {UsersService} from "./users.service"
import {randomBytes,scrypt as _script} from "crypto";
import {promisify} from "util";

const scrypt= promisify(_script);

@Injectable()
export class AuthService{
    constructor(private usersService:UsersService){}
   async signup(email:string,password:string){
        //See if email in use
        const users = await this.usersService.find(email)
        if(users.length){
            throw new BadRequestException('email in use');
        }
        //Hash users password
        //Genrate a Salt
        const salt = randomBytes(8).toString('hex');
        //d23d8w3gd278d2d2
        //Hash the salt and password together
        const hash =(await scrypt(password,salt,32)) as Buffer;
        //Join the hash and the password together
        const result = salt+'.'+hash.toString('hex');
        //create a user save it
        const user = await this.usersService.create(email,result);
       
        //return the user
        return user;
    }
   async signin(email:string,password:string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('User Not found');
        }
        const [salt,stroedHash]= user.password.split('.');
        const hash = (await scrypt(password,salt,32)) as Buffer;
        if(stroedHash!==hash.toString('hex')){
            throw new BadRequestException('Bad PAssword')
        }
        return user;
    }

}