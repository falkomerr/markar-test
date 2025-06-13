export interface Car {
  id?: number;
  mark_id: string; // Марка автомобиля
  folder_id: string; // Модель автомобиля
  modification_id?: string;
  complectation_name?: string;
  body_type?: string;
  wheel?: string;
  color?: string;
  metallic?: string;
  availability?: string;
  custom?: string;
  state?: string;
  owners_number?: string;
  run: number; // Пробег
  year: number; // Год выпуска
  registry_year?: number;
  currency?: string;
  vin?: string;
  price: number; // Цена автомобиля
  credit_discount?: number;
  insurance_discount?: number;
  tradein_discount?: number;
  max_discount?: number;
  extras?: string;
  images?: {
    image: string[];
  };
  photos?: string[]; // Для совместимости
  video?: string;
  booking_allowed?: boolean;
  pts?: string;
  unique_id?: number;
  exchange?: string;
  tech_param_id?: number;
  engine_volume: number; // Объем двигателя
  engine_power: string; // Мощность двигателя
  engine_type: string; // Тип двигателя
  gearbox: string; // Коробка передач
  drive?: string; // Тип привода
  model_name?: string;
  generation_name?: string;
  mark_cyrillic_name?: string;
  model_cyrillic_name?: string;
  offer_type?: string;
  updated_at?: string;
  generation_rel?: {
    slug: string;
    count: number;
    name: string;
  };
  brand_rel?: {
    slug: string;
    count: number;
    name: string;
  };
  model_rel?: {
    slug: string;
    count: number;
    name: string;
  };
  images_amount?: number;
  engine_type_eng?: string;
  engine_power_num?: number;
  body_type_eng?: string;
  owners_number_num?: number;
  color_eng?: string;
  gearbox_eng?: string;
}

export interface ApiResponse {
  data: Car[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export type SortOrder = "asc" | "desc" | "";
