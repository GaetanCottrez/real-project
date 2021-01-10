export declare interface IArticleCategory {
	reference: string;
	category: string;
	priceSell: number;
	referenceCustomer: string;
}

export declare interface IArticle {
	id: string;
	reference: string;
	description: string;
	familyCode: string;
	warranty: number;
	weightUnit: number;
	weight: number;
	weightNet: number;
	weightGross: number;
	priceBuy: number;
	priceSell: number;
	priceIncludedTaxes: number;
	statusLine1: string;
	statusLine2: string;
	barcode: string;
	country: string;
	categories: IArticleCategory[];
	exceptions: IArticleCategory[];
	archived?: boolean;
	trash?: boolean;
}
