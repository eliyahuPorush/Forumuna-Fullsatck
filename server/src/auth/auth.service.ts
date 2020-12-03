import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { sign, verify} from 'jsonwebtoken' ;
import { NewUserSignupDto } from 'src/dto/newUserSignup.dto';
import { UpdateUserExsist } from 'src/dto/updateUserExsist.dto';
@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
        ){}
        
        
        async login(email: string, password: string){
            const user = await this.userRepository.findOne({ email: email, password: password}) ;
            if(!!user){
                const token  = sign({email,password},  process.env.JWT_SECRET) ;
                return {...user, token} ; 
            }
            throw new HttpException("user not exist", 400) ;
        }
        
        
        async signup(user: User): Promise<any> {
            const token = sign({email: user.email, password: user.password}, process.env.JWT_SECRET) ;
            this.userRepository.save(user)
            return {...user, token: token}
        }
        
        
        async updateUserImage(path: string, userEmail: string) {
            let pathFixed ;
            await this.userRepository.findOne({email: userEmail}).then((user) => {
                user.profileImagePath = path.slice(7).replace(/\\/, '/') ;
                this.userRepository.save(user) ;
                pathFixed = user.profileImagePath ;
            })   
            return pathFixed 
        }
        
        updateUserDetails(updatedUser: NewUserSignupDto, token: string) {
            try{
                const user = verify(token, process.env.JWT_SECRET) ;
                this.userRepository.findOne({email: user['email']}).then((user) => {
                    const {name, email, password} = updatedUser ;
                    user.email = email ;
                    user.name = name ;
                    user.password = password ;
                    this.userRepository.save(user) ; 
                })
            }
            catch(err){
                console.log('error on update details: ', err);
                
            }
        }
        
        async getImageUser(token: string){
            try{
                const payload = verify(token, process.env.JWT_SECRET) ;
                const user = await this.userRepository.findOne({email: payload['email']}) ;
                return user.profileImagePath
            }
            catch{
                throw new HttpException('invalid token', 401) ;
            }
        }
        
        async getUserByToken(token: string){
            try{
                const user = verify(token, process.env.JWT_SECRET) ;
                return await this.userRepository.findOne({email: user['email']})
            }
            catch(err){
                throw new HttpException('invalid token', 401) ;
            }   
        }
        
        async getOtherUserDetails(userID: number) {
            const user = await this.userRepository.findOne(userID) ;
            delete user['password'] ;
            return user
        }
        
        async updateUserExsistDetails(updateProfile: UpdateUserExsist) {
            await this.userRepository.findOne(updateProfile.id).then((user) => {
                const {name, email, currentPassword, newPassword} = updateProfile ;
                user.email = email ;
                user.name = name ;
                if(currentPassword && newPassword){
                    if(user.password == currentPassword)
                        user.password = newPassword ;
                }
                this.userRepository.save(user) ; 
            })
            let user = await this.userRepository.findOne(updateProfile.id) ;
            user .password = '';
            return user
        }
        
    }
    