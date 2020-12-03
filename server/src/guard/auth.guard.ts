import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const token = context.switchToHttp().getRequest()['headers']['token'] ;
    let user ;
    let expireTime: number ;
    const currentTimeMatch =  Math.floor(new Date().getTime() / 1000) ;   
    try{
      user = verify(token, process.env.JWT_SECRET) ;
      expireTime = user['iat'] + 3600000 ; // token expired in 1 hour
    }
    catch(err){
      throw new HttpException("invalid token", 401) ; //  token invalid
    }

    if(currentTimeMatch > expireTime) // check if token was expired
        // token expired
        throw new HttpException("token expired", 401) ; 
    else 
      return true; // token valid and not expired
  }
}
