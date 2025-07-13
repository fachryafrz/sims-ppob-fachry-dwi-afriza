export interface Error {
  data: string | null;
  message: string;
  status: number;
}

export interface ServicesType {
  service_code: string;
  service_icon: string;
  service_name: string;
  service_tariff: number;
}

export interface BannerType {
  banner_image: string;
  banner_name: string;
  description: string;
}

export interface TransactionType {
  created_on: string;
  description: string;
  invoice_number: string;
  total_amount: number;
  transaction_type: string;
}
