export type HostPlateType = {
  category: string;
  title: string;
  price: string;
  quantity: number;
  image: string[];
  description: string;
};

export const HOST_PLATE_DEFAULT_VALUES = {
  category: '',
  title: '',
  price: '0',
  quantity: 1,
  image: [],
  description: '',
};
