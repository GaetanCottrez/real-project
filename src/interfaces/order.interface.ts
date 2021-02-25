import { IUser, typeAccountUserEnum } from './user.interface';
import { ICustomer, IDeliveryAddress } from './customer.interface';
import { IArticle } from './article.interface';

export enum stateOrderEnum {
	sage = 'sage',
	deleted = 'deleted',
	pouch = 'pouch'
}

export declare interface ILineOrder {
	article: IArticle;
	referenceArticle: string;
	descriptionArticle: string;
	quantity: number;
	unitPrice: number;
	discount: number;
}

export declare interface IOrder {
	id: string;
	typeAccountUser: typeAccountUserEnum;
	docNumber?: string;
	temporaryDocNumber?: string;
	customer: ICustomer;
	deliveryInstructions: string;
	date: Date;
	commercial: IUser;
	yourReference: string
	shippingFees: number;
	deliveryAddress: IDeliveryAddress;
	state?: stateOrderEnum;
	lines: ILineOrder[];
}
