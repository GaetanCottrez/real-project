import { UserMail } from '../../users/domain/value-objects/usermail';
import { User } from '../../users/domain/models/user';
import { UserDto } from '../../users/domain/data-transfer-objects/user-dto';
import { ArticleDto } from '../../articles/domain/data-transfer-objects/article-dto';
import { Article } from '../../articles/domain/models/article';
import { ArticleCategory } from '../../articles/domain/models/articleCategory';
import { ArticleCategoryDto } from '../../articles/domain/data-transfer-objects/article-category-dto';
import { Customer } from '../../customers/domain/models/customer';
import { ConstructCustomerDto } from '../../customers/domain/data-transfer-objects/construct-customer-dto';
import { DeliveryAddress } from '../../customers/domain/models/deliveryAddress';
import { DeliveryAddressDto } from '../../customers/domain/data-transfer-objects/delivery-address-dto';
import { LineOrder } from '../../orders/domain/models/lineOrder';
import { ConstructLineOrderDto } from '../../orders/domain/data-transfer-objects/construct-line-order.dto';

export class createInstanceService {
  static deliveryAddress(
    deliveryAddress: DeliveryAddressDto,
  ): DeliveryAddress | null {
    return deliveryAddress ? new DeliveryAddress(deliveryAddress) : null;
  }

  static user(user: UserDto): User | null {
    return user && user.id
      ? new User(
          user.id,
          user.externalId,
          user.username,
          user.password,
          user.firstName,
          user.lastName,
          user.displayName,
          new UserMail(user.email),
          user.role,
          user.accounts,
        )
      : null;
  }

  static customer(customer: ConstructCustomerDto): Customer | null {
    return customer && customer.id ? new Customer(customer) : null;
  }

  static article(article: ArticleDto): Article | null {
    return article && article.id
      ? new Article(
          article.id,
          article.reference,
          article.description,
          article.familyCode,
          article.warranty,
          article.weightUnit,
          article.weight,
          article.weightNet,
          article.weightGross,
          article.priceBuy,
          article.priceSell,
          article.priceIncludedTaxes,
          article.statusLine1,
          article.statusLine2,
          article.barcode,
          article.country,
          article.categories,
          article.exceptions,
        )
      : null;
  }

  static articleCategory(
    articleCategoryDto: ArticleCategoryDto,
  ): ArticleCategory {
    return ArticleCategory.create(articleCategoryDto);
  }

  static lineOrder(constructLineOrderDto: ConstructLineOrderDto) : LineOrder | null {
    return constructLineOrderDto && constructLineOrderDto.article ? new LineOrder(constructLineOrderDto) : null;
  }
}
