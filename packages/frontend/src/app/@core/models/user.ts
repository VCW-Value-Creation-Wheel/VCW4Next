import { Role } from "./role";

export interface UserRole {
    user: string;
    role: string;
    userName?: string;
    roleName?: string
}

export interface UserEnum {
    id: number;
    createdAt: string;
    updateAt: string;
    updateBy: string;
    createBy: string;
    userInum: string;
    role: Role
}

export interface UserInfo {
    firstName: string;
    id: string;
    lastName: string;
    username: string;
}


