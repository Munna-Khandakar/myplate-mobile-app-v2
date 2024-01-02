import {AddressType} from './AddressType';

export type HostPlateType = {
  category: string;
  title: string;
  price: string;
  quantity: number;
  image: string[];
  description: string;
  address: AddressType;
  lastTimeToOrder: Date;
  canOrderAnytime: boolean;
};

export const HOST_PLATE_DEFAULT_VALUES = {
  category: '',
  title: '',
  price: '0',
  quantity: 1,
  image: [],
  description: '',
  address: {},
  lastTimeToOrder: new Date(),
  canOrderAnytime: false,
};
