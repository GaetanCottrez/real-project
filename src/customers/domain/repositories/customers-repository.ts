import { Customer } from '../models/customer';
import { CustomerDto } from '../data-transfer-objects/customer-dto';

export interface ICustomersRepository {
  getCustomerById(id: string): Promise<Customer> | null;

  getCustomers(match: object): Promise<Customer[]>;

  save(customer: CustomerDto): void;
}
