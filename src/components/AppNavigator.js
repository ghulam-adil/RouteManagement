import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Main from './Main';
import Testing from './Testing';


//=============APPSTART=========================
const AppNavigator = createStackNavigator({
    login: { screen: Login },
    main: { screen: Main },
    testing: { screen: Testing },
},
    {
        initialRouteName: 'main'
    }
);

export default createAppContainer(AppNavigator);