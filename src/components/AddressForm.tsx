import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {Fragment, useEffect} from 'react';
import InputField from './common/InputField';
import MainActionButton from './MainActionButton';
import SecondaryActionButton from './SecondaryActionButton';
import {
  AddressFormInputs,
  AddressType,
  DEFAULT_ADDRESS_FORM_VALUES,
} from '../types/AddressType';

type AddressFromProps = {
  onFormSubmit: (data: AddressFormInputs) => void;
  closeForm: () => void;
  data?: AddressType;
};
export const AddressForm = (props: AddressFromProps) => {
  const {onFormSubmit, closeForm, data} = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<AddressFormInputs>({
    defaultValues: DEFAULT_ADDRESS_FORM_VALUES,
    mode: 'all',
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  return (
    <Fragment>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Please Enter Plate Name'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Fragment>
            <InputField
              label="Title"
              placeholder="Sweet Home "
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.title && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}
          </Fragment>
        )}
        name="title"
      />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'Please Enter Plate Name'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Fragment>
            <InputField
              label="Description"
              placeholder="Falt #, Road #, Sector #"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.description && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}
          </Fragment>
        )}
        name="description"
      />
      <View style={{flexDirection: 'row', width: '100%'}}>
        <SecondaryActionButton pressHandler={closeForm} text="Cancel" />
        <MainActionButton
          pressHandler={handleSubmit(onFormSubmit)}
          text="Save"
        />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
