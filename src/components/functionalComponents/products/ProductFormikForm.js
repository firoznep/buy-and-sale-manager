import React, {useEffect} from 'react';

import {ScrollView, Text, TextInput, View} from 'react-native';

import {useFormikContext} from 'formik';

import BasicButton from '../../basicComponents/BasicButton';
import BasicInput from '../../basicComponents/BasicInput';
import ModalDateTimePicker from '../../basicComponents/ModalDateTimePicker';
import ErrorMsg from '../ErrorMsg';
import GetImage from '../GetImage';
import RenderItemChild from '../RenderItemChild';
import {getTotalAmt, randomId} from '../../../util/utilFunc';
import {styles} from '../../../styles/styles';
import BasicDropdownPicker from '../../basicComponents/BasicDropdownPicker';
import {sortedUniqBy} from '../../../util/sortedUniq';
import {useSelector} from 'react-redux';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../../../colors/colors';
import DropdownPicker from '../DropdownPicker';

const ProductFormikForm = () => {
  const filteredAllData = useSelector((state) =>
    state.productReducer.filter.allData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    touched,
    errors,
  } = useFormikContext();

  useEffect(() => {
    setFieldValue('real_cost', getTotalAmt(values.cost_price, values.expenses));
    setFieldValue(
      'total_amount',
      getTotalAmt(values.cost_price, values.expenses, values.quantity),
    );
  }, [values.cost_price, values.expenses, values.quantity]);

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        {/* DATE */}
        <ModalDateTimePicker
          pickedDateTime={(d) => setFieldValue('date', d)}
          title={new Date(values.date).toDateString()}
        />

        {/* IMGDATA */}

        <GetImage setImgData={(d) => setFieldValue('img_data', d)} />

        {/* VENDOR */}
        <BasicDropdownPicker
          selectedValue={values.vendor}
          onValueChange={handleChange('vendor')}
          title="Vendor">
          {sortedUniqBy(filteredAllData, 'vendor').map((ven) => (
            <Picker.Item label={ven} value={ven} key={randomId()} />
          ))}
        </BasicDropdownPicker>

        {/* NAME */}
        <BasicDropdownPicker
          selectedValue={values.name}
          onValueChange={handleChange('name')}
          title="Product Name *">
          {sortedUniqBy(filteredAllData, 'name').map((ven) => (
            <Picker.Item label={ven} value={ven} key={randomId()} />
          ))}
        </BasicDropdownPicker>
        <ErrorMsg errField={errors.name} touchedField={touched.name} />

        {/* MODEL */}
        <BasicDropdownPicker
          selectedValue={values.model}
          onValueChange={handleChange('model')}
          title="Model or Design or any category *">
          {sortedUniqBy(filteredAllData, 'model').map((ven) => (
            <Picker.Item label={ven} value={ven} key={randomId()} />
          ))}
        </BasicDropdownPicker>
        <ErrorMsg errField={errors.model} touchedField={touched.model} />

        {/* QUANTITY */}
        <BasicInput
          label="Quantity *"
          onChangeText={handleChange('quantity')}
          onBlur={handleBlur('quantity')}
          keyboardType="numeric"
          value={values.quantity}
        />
        <ErrorMsg errField={errors.quantity} touchedField={touched.quantity} />

        {/* UNIT */}
        <DropdownPicker
          title="Unit"
          selectedValue={values.unit}
          onValueChange={handleChange('unit')}>
          <Picker.Item label="Pick Unit" value="" key={randomId()} />
          <Picker.Item label="pcs" value="pcs" key={randomId()} />
          <Picker.Item label="metre" value="metre" key={randomId()} />
          <Picker.Item label="than" value="than" key={randomId()} />
          <Picker.Item label="kg" value="kg" key={randomId()} />
          <Picker.Item label="ltr" value="ltr" key={randomId()} />
          <Picker.Item label="guz" value="guz" key={randomId()} />
          <Picker.Item label="inch" value="inch" key={randomId()} />
          <Picker.Item label="gallon" value="gallon" key={randomId()} />
        </DropdownPicker>

        {/* COST PRICE */}
        <BasicInput
          label="Primary cost on per unit *"
          onChangeText={handleChange('cost_price')}
          onBlur={handleBlur('cost_price')}
          keyboardType="numeric"
          value={values.cost_price}
        />
        <ErrorMsg
          errField={errors.cost_price}
          touchedField={touched.cost_price}
        />

        {/* EXPENSES */}
        <BasicInput
          label="Expenses On per unit (tax, vat,transport...)"
          onChangeText={handleChange('expenses')}
          onBlur={handleBlur('expenses')}
          keyboardType="numeric"
          value={values.expenses}
        />

        <View
          style={{
            backgroundColor: colors.white,
            padding: values.real_cost ? 10 : 0,
            marginVertical: values.real_cost ? 5 : 0,
          }}>
          <RenderItemChild
            title="Real Cost (Auto Update)"
            itemField={values.real_cost}
          />
        </View>
        <View
          style={{
            backgroundColor: colors.white,
            padding: values.total_amount ? 10 : 0,
            marginVertical: values.total_amount ? 5 : 0,
          }}>
          <RenderItemChild
            title="Total Amount (Auto Update)"
            itemField={values.total_amount}
          />
        </View>

        {/* SIZE */}
        <DropdownPicker
          title="Size"
          selectedValue={values.size}
          onValueChange={handleChange('size')}>
          <Picker.Item label="Pick Size" value="" key={randomId()} />
          <Picker.Item label="X-SML" value="X-SML" key={randomId()} />
          <Picker.Item label="SML" value="SML" key={randomId()} />
          <Picker.Item label="MEDIUM" value="MEDIUM" key={randomId()} />
          <Picker.Item label="LARGE" value="LARGE" key={randomId()} />
          <Picker.Item label="XL" value="XL" key={randomId()} />
          <Picker.Item label="XXL" value="XXL" key={randomId()} />
          <Picker.Item label="XXXL" value="XXXL" key={randomId()} />
          <Picker.Item label="FREE-SIZE" value="FREE-SIZE" key={randomId()} />
        </DropdownPicker>

        {/* COLOR */}
        <BasicInput
          label="Color"
          onChangeText={handleChange('color')}
          onBlur={handleBlur('color')}
          value={values.color}
        />

        {/* DESCRIPTION */}
        <BasicInput
          label="Description"
          onChangeText={handleChange('description')}
          value={values.description}
        />
      </ScrollView>
      <BasicButton
        onPress={handleSubmit}
        iconName="check-circle"
        style={styles.roundBtn}
      />
    </>
  );
};

export default ProductFormikForm;
