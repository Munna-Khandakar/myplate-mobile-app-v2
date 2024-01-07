import {UserType} from './UserTypes';
import {AddressType} from './AddressType';

export type HostPlateType = {
  category: string;
  title: string;
  price: string;
  quantity: number;
  images: string[];
  description: string;
  address: string;
  lastTimeToOrder: Date;
  canOrderAnyTime: boolean;
};

export const HOST_PLATE_DEFAULT_VALUES = {
  category: '',
  title: '',
  price: '0',
  quantity: 1,
  images: [],
  description: '',
  address: '',
  lastTimeToOrder: new Date(),
  canOrderAnyTime: false,
};
