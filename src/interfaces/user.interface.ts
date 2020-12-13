import { UserMail } from '../users/domain/value-objects/usermail';
export enum RoleEnum {
	commercial = "commercial",
	backoffice = "backoffice",
	admin = "admin"
}

export enum typeAccountUserEnum {
	normal = "normal",
	gg = "gg",
	mi = "mi",
	acwprepa = 'acwprepa',
	pub = "pub",
	acwtunnel = "acwtunnel",
	sc = "sc"
}

export declare interface typeAccountUser {
	external_id: number;
	displayName: string;
	firstName: string;
	lastName: string;
	type : typeAccountUserEnum
}

export declare interface IUser {
	id: string;
	external_id: number;
	username: string;
	password: string;
	displayName: string;
	firstName: string;
	lastName: string;
	email: UserMail;
	role: RoleEnum;
	accounts: typeAccountUser[];
	archived?: boolean;
	trash?: boolean;
}
