import {StyleSheet, Text, View} from 'react-native';
import React, {Fragment} from 'react';
import {Controller, useForm} from 'react-hook-form';
import InputField from '../common/InputField';
import SecondaryActionButton from '../SecondaryActionButton';
import MainActionButton from '../MainActionButton';

type NameChangeFormProps = {
  onFormSubmit: (data: {username: string}) => void;
  closeForm: () => void;
};

const NameChangeForm = (props: NameChangeFormProps) => {
  const {onFormSubmit, closeForm} = props;

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    defaultValues: {username: ''},
    mode: 'all',
  });

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
              label="Username"
              placeholder="username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            {errors.username && (
              <Text style={styles.errorMessage}>This is required.</Text>
            )}
          </Fragment>
        )}
        name="username"
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

export default NameChangeForm;

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    paddingHorizontal: 10,
  },
});
