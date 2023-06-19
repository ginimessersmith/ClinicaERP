import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator(
    (data:string, context:ExecutionContext)=>{
        const req=context.switchToHttp().getRequest();
        const user= req.user;

        if(!user) throw new InternalServerErrorException('user not found request getuser');
        
        return (!data)?user:user[data];
    }
);