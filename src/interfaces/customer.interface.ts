import { IUser } from './user.interface';

export declare interface IDeliveryAddress {
	id: string;
	externalId: number;
	designation: string;
	addressLine1: string;
	addressLine2: string;
	zip: string;
	city: string;
	country: string;
	default: boolean;
	contact: string;
	phoneNumber: string;
}

export declare interface ICustomer {
	id: string;
	reference: string;
	designation: string;
	type: string;
	quality: string;
	categoryRate: string;
	contact: string;
	addressLine1: string;
	addressLine2: string;
	zip: string;
	city: string;
	country: string;
	ape: string;
	vatNumber: string;
	siret: string;
	phoneNumber: string;
	email: string;
	website: string;
	sleep: boolean;
	blocked: boolean;
	comments: string;
	commercial: IUser;
	account: string;
	deliveryAddress: IDeliveryAddress[]
	archived?: boolean;
	trash?: boolean;
}
