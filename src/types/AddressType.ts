export type AddressType = {
  _id: string;
  description: string;
  selected: boolean;
  title: string;
};

export type AddressFormInputs = {
  description: string;
  title: string;
};

export const DEFAULT_ADDRESS_FORM_VALUES = {
  description: '',
  title: '',
};
