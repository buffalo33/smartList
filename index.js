/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './components/App';
import { name as appName } from './app.json';
import setup from './components/setup';

AppRegistry.registerComponent(appName, () => App);
