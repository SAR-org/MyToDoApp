import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import ToDoHomeStack from './toDoStack';
import AboutStack from './aboutStatck';

const RootDrawerNavigator = createDrawerNavigator({
    'My TO DOs' : {
        screen : ToDoHomeStack
    },
    About : {
        screen : AboutStack
    }
});

export default createAppContainer(RootDrawerNavigator);