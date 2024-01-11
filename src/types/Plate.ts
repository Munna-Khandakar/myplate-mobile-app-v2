export type PlateType = {
  title: string;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  price: string; // Assuming price is stored as a string
  address: string;
};

export type PlateResponseType = {
  title: string;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  price: string;
  address: string;
  lastTimeToOrder: string;
  canOrderAnyTime: boolean;
  host: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};
