/**
 * @format
 */
import MaterialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App'; 
import appConfig from './app.json';

const appName = appConfig.name;

if (Platform.OS === 'web') {
  const iconFontStyles = `@font-face {
  src: url(${MaterialCommunityIcons});
  font-family: 'MaterialCommunityIcons';
}`;

  const style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }
  document.head.appendChild(style);
  const rootTag = document.getElementById('root');
  AppRegistry.runApplication(appName, {rootTag});
} else {
  AppRegistry.registerComponent(appName, () => App);
}
