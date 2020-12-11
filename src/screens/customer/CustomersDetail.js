import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BasicButton from '../../components/basicComponents/BasicButton';
import BasicFlatList from '../../components/basicComponents/BasicFlatList';
import SafeScreen from '../../components/basicComponents/SafeScreen';
import RenderCustomer from '../../components/customer/RenderCustomers';
import {Customers} from '../../database';
import {customerFlatListRefreshedAction} from '../../storeRedux/actions/customerAction';
import {styles} from '../../styles/styles';

const CustomersDetail = ({navigation}) => {
  // USESTATES
  const [allCustomers, setAllCustomers] = useState([]);

  // USESELECTORS
  const allCustomersDataFromReducer = useSelector((state) =>
    state.customerReducer.allCustomerData.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    ),
  );

  const isCustomerFlatListRefreshed = useSelector(
    (state) => state.customerReducer.isCustomerFlatListRefreshed,
  );

  // DISPATCH
  const dispatch = useDispatch();

  // USEEFFECT
  useEffect(() => {
    setAllCustomers(allCustomersDataFromReducer);
  }, []);

  // ONFRESH
  const onRefresh = useCallback(() => {
    dispatch(customerFlatListRefreshedAction(true));
    setAllCustomers(allCustomersDataFromReducer);
    dispatch(customerFlatListRefreshedAction(false));
  });

  return (
    <SafeScreen>
      <View>
        <Text>Customers</Text>
      </View>

      <BasicFlatList
        data={allCustomers}
        renderItem={({item}) => (
          <RenderCustomer
            item={item}
            handleDelete={() => handleDelete(Customers, item)}
            // handleUpdate={async () => {
            //   let item1 = await Customers.get({id: item.id});
            //   dispatch(updateSaleAction(item1));
            //   navigation.navigate('UpdateSale');
            // }}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isCustomerFlatListRefreshed}
            onRefresh={onRefresh}
          />
        }
      />

      <BasicButton
        iconName="plus"
        style={styles.roundBtn}
        onPress={() => navigation.navigate('AddCustomer')}
      />
    </SafeScreen>
  );
};

export default CustomersDetail;
