import { Body, Controller, Get, HttpException, Param, Post, Headers, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';
import { NewUserSignupDto } from 'src/dto/newUserSignup.dto';
import { User } from 'src/entity/user.entity';
import { userLoginSchema, userSignupSchema } from 'src/schemas/user.schema';
import { diskStorage } from 'multer' ;
import { parse } from 'path';
import { UpdateUserExsist } from 'src/dto/updateUserExsist.dto';
import { AuthGuard } from 'src/guard/auth.guard';


const storageConfig = {storage:diskStorage({
    destination: './images/profileImages',
    filename: (req, file, cb) =>{
        const fileName = req.params['user_email'] ;
        const extension = parse(file.originalname).ext ;
        cb(null,`${fileName}${extension}`) ;
    }
})}


@Controller('users')
export class UsersController {
    constructor(private authSRV: AuthService){}

    @Get('login/:email/:password')
    login(@Param('email')email: string, @Param('password')password: string){
        if(!userLoginSchema.validate({email, password}).error){
            return this.authSRV.login(email, password) ;
        }
}

    @Post('signup')
    async signup(@Body()newUser: NewUserSignupDto, ){
        if(!userSignupSchema.validate(newUser).error) {
                const user = new User() ;
                const {name, email, password} = newUser ;
                user.name = name ;
                user.email = email ;
                user.password = password ;
                return this.authSRV.signup(user)
        }
        else {
            console.log(userSignupSchema.validate(newUser).error)
            throw new HttpException('wrong new user', 400) ;     
        }
    }

@Post('uploadImageProfile/:user_email')
@UseInterceptors(FileInterceptor('image', storageConfig))
async uploadImage(@UploadedFile() profile_image, @Param('user_email') userEmail: string){
    if(profile_image){
        const path = await this.authSRV.updateUserImage(profile_image.path, userEmail) ;
        return JSON.stringify({path})
    }
}

@Get('getUserByToken/:token')
getUserByToken(@Param('token') token){
    return this.authSRV.getUserByToken(token)
}


@Get('getOtherUserDetails/:userID')
getOtherUserDetails(@Param('userID') userID: number){
    return this.authSRV.getOtherUserDetails(userID)
}


@Post('updateProfile')
@UseGuards(AuthGuard)
updateProfile(@Body() updateProfile: UpdateUserExsist){
    return this.authSRV.updateUserExsistDetails(updateProfile)
}

}
