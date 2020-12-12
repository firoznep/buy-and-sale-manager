import {Picker} from '@react-native-picker/picker';
import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../colors/colors';
import BasicButton from '../../components/basicComponents/BasicButton';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import BasicModal from '../../components/basicComponents/BasicModal';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderCustomer from '../../components/customer/RenderCustomers';
import DropdownPicker from '../../components/functionalComponents/DropdownPicker';
import FlatListHeaderDetail from '../../components/functionalComponents/FlatListHeaderDetail';
import RenderProductChildItem from '../../components/functionalComponents/products/RenderProductChildItem';
import {Customers, CustomersPay} from '../../database';
import {
  allCustomersPayAction,
  customerFlatListRefreshedAction,
  customerPaymentScreenVisibleAction,
  updateCustomerAction,
} from '../../storeRedux/actions/customerAction';
import {styles} from '../../styles/styles';
import {handleDelete} from '../../util/handleDelete';
import {sortedUniqBy} from '../../util/sortedUniq';
import {randomId} from '../../util/utilFunc';
import CustomersPayment from './CustomersPayment';

const CustomersDetail = ({navigation}) => {
  // USESTATES
  const [allCustomers, setAllCustomers] = useState([]);

  // USESELECTORS
  const allCustomersDataFromReducer = useSelector((state) =>
    state.customerReducer.allCustomerData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const isCustomerPaymentScreenVisible = useSelector(
    (state) => state.customerReducer.isCustomerPaymentScreenVisible,
  );

  const isCustomerFlatListRefreshed = useSelector(
    (state) => state.customerReducer.isCustomerFlatListRefreshed,
  );

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  // useEffect(() => {
  // }, []);

  // ONFRESH
  const onRefresh = useCallback(() => {
    dispatch(customerFlatListRefreshedAction(true));
    setAllCustomers(allCustomersDataFromReducer);
    dispatch(customerFlatListRefreshedAction(false));
  });

  return (
    <SafeScreen>
      <FlatListHeaderDetail data={allCustomers}>
        <RenderProductChildItem
          item={allCustomers.length}
          title="Total Customer"
        />
      </FlatListHeaderDetail>

      <BasicFlatList
        data={allCustomers}
        renderItem={({item}) => (
          <RenderCustomer
            item={item}
            handleDelete={() => handleDelete(Customers, item)}
            handleUpdate={async () => {
              let item1 = await Customers.get({id: item.id});
              dispatch(updateCustomerAction(item1));
              navigation.navigate('UpdateCustomer');
            }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isCustomerFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicModal
        visible={isCustomerPaymentScreenVisible}
        childHeight={'99%'}
        top={1}
        right={1}
        iconName="times"
        // iconBgColor="transparent"
        iconElevation={0}
        onPress={() => dispatch(customerPaymentScreenVisibleAction(false))}>
        <CustomersPayment />
      </BasicModal>

      <BasicButton
        iconName="plus"
        style={styles.roundBtn}
        onPress={() => navigation.navigate('AddCustomer')}
      />
    </SafeScreen>
  );
};

export default CustomersDetail;
