import { LineOrderDto } from '../../../domain/data-transfer-objects/line-order.dto';
import { LineOrderMongoDto } from './lineOrder-mongo.dto';

export class DeliveryOrderMongoDto {
  readonly id: string;
  readonly li_no: string;
  readonly li_intitule: string;
  readonly li_adresse: string;
  readonly li_complement: string;
  readonly li_codepostal: string;
  readonly li_ville: string;
  readonly li_pays: string;
  readonly li_principal: string;
  readonly li_contact: string;
  readonly li_telephone: string;
}

export class OrderMongoDto {
  readonly id: string;
  readonly lignes: LineOrderMongoDto[];
  readonly frais_de_port: number;
  readonly instructions_livraison: string;
  readonly reference_client: string;
  readonly client_numero: string;
  readonly client_address: string;
  readonly code_postal: string;
  readonly n_cattarif: string;
  readonly livraison: DeliveryOrderMongoDto;
  readonly account: string;
  readonly li_no: number;
  readonly collaborateur: number;
  readonly do_date: Date;
  readonly do_type: number;
  readonly tmp_id: string;
  readonly status: string;
  readonly co_no: string;
  readonly Customers?: string;
  readonly Users?: string;
  readonly do_piece?: string;
}
