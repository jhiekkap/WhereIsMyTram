import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  DrawerLayoutAndroid,
} from 'react-native'; 

const DrawerExample = ( {navigation}) => {
  const NavigationView = () => (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>
        I'm in the Drawer!
      </Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      drawerWidth={300}
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => <NavigationView />}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
          Hello
        </Text>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>
          World!
        </Text> 
      </View>
    </DrawerLayoutAndroid>
  );
};

export default DrawerExample;
