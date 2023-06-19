import { SetMetadata, UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserRolesGuard } from "../guards/user-roles/user-roles.guard";
import { ValidRoles } from "../interfaces/validRoles.interface";
import { RolesProtected } from "./roles-protected/roles-protected.decorator";

export function Auth(...roles: ValidRoles[]) {
    return applyDecorators(
        RolesProtected(...roles),
        UseGuards(AuthGuard(), UserRolesGuard),
    );
}