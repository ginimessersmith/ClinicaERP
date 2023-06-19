import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decoratiors/roles-protected/roles-protected.decorator';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector
  ) { }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    const req=context.switchToHttp().getRequest();
    const user=req.user as User;
    if(!validRoles) return true;
    if(validRoles.length === 0) return true;
    if(!user)
      throw new BadRequestException('user not found in auth/guards/user-roles guards')
    
    for (const role of user.roles) { //role variable que guardara cada uno de los user.roles
      if(validRoles.includes(role)){
        return true;
      }
    }
    throw new ForbiddenException(`user ${user.fullname} needed a valid rol: ${validRoles}`);
  }
}
