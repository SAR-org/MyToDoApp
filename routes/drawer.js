import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import ToDoHomeStack from './toDoStack';
import AboutStack from './aboutStatck';
import CustomiseAppStack from './customiseAppStack';

const RootDrawerNavigator = createDrawerNavigator({
    'My TO DOs' : {
        screen : ToDoHomeStack
    },
    About : {
        screen : AboutStack
    },
    CustomiseApp : {
        screen : CustomiseAppStack
    }
});

export default createAppContainer(RootDrawerNavigator);