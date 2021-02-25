import { Inject, Injectable } from '@nestjs/common';
import { DomainError } from '../../shared/domain/domain-error';
import { Customer } from '../domain/models/customer';
import { CustomerDto } from '../domain/data-transfer-objects/customer-dto';
import { ICustomersRepository } from '../domain/repositories/customers-repository';
import { DeliveryAddressDto } from '../domain/data-transfer-objects/delivery-address-dto';

@Injectable()
export class CustomersService implements ICustomersRepository {
  constructor(
    @Inject('ICustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  async getCustomers(filters: object = {}): Promise<Customer[]> {
    return await this.customersRepository.getCustomers(filters);
  }

  async getCustomerById(id: string): Promise<Customer> {
    const customer = await this.customersRepository.getCustomerById(id);
    if (!customer) {
      throw new DomainError(`The customer with id ${id} don't exists.`);
    }
    return customer;
  }

  customerView(customer: Customer): CustomerDto {
    return customer.asDTO();
  }

  async addDeliveryAddress(customerId: string, deliveryAddress: DeliveryAddressDto): Promise<Customer> {
    const customer = await this.getCustomerById(customerId);
    customer.addDeliveryAddress(deliveryAddress);
    await this.save(customer.asDTO());

    return customer;
  }

  async removeDeliveryAddress(customerId: string, deliveryAddressId: string): Promise<Customer> {
    const customer = await this.getCustomerById(customerId);
    customer.removeDeliveryAddress(deliveryAddressId);
    await this.save(customer.asDTO());

    return customer;
  }

  async save(customer: CustomerDto): Promise<void> {
    await this.customersRepository.save(customer);
  }


}
