//React
import React from 'react';
//React Native
import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import {
	FontAwesome,
	MaterialIcons,
	MaterialCommunityIcons
} from '@expo/vector-icons';
//Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
//Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
//Expo
import Constants from 'expo-constants';
//Views
import DeckListView from './pages/DeckListView';
import DeckView from './pages/DeckView';
import NewDeckView from './pages/NewDeckView';
import QuizView from './pages/QuizView';
import NewQuestionView from './pages/NewQuestionView';
import { setLocalNotification } from './utils/helpers';

const DeckListStack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}
	render() {
		return (
			<Provider store={createStore(reducer)}>
				<View style={{ height: Constants.statusBarHeight }}>
					<StatusBar translucent />
				</View>
				<NavigationContainer>
					<DeckListStack.Navigator headerMode='screen'>
						<DeckListStack.Screen
							name='TabView'
							component={TabView}
							options={{ headerShown: false }}
						/>
						<DeckListStack.Screen
							name='DeckView'
							component={DeckView}
							options={{
								labelStyle: { fontSize: 16, fontWeight: 'bold' },
								headerStatusBarHeight: 0,
								headerTintColor: '#f7f7f7',
								headerStyle: {
									backgroundColor: '#232c39'
								},
								title: 'deck'
							}}
						/>
						<DeckListStack.Screen
							name='NewQuestionView'
							component={NewQuestionView}
							options={{
								labelStyle: { fontSize: 16, fontWeight: 'bold' },
								headerStatusBarHeight: 0,
								headerTintColor: '#f7f7f7',
								headerStyle: {
									backgroundColor: '#232c39'
								},
								title: 'add card'
							}}
						/>
						<DeckListStack.Screen
							name='QuizView'
							component={QuizView}
							options={{
								labelStyle: { fontSize: 16, fontWeight: 'bold' },
								headerStatusBarHeight: 0,
								headerTintColor: '#f7f7f7',
								headerStyle: {
									backgroundColor: '#232c39'
								},
								title: 'quiz'
							}}
						/>
					</DeckListStack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}
}

const TabView = () => {
	return (
		<TabNavigator.Navigator
			backBehavior='none'
			tabBarOptions={{
				labelStyle: { fontSize: 16, fontWeight: 'bold' },
				activeTintColor: '#f7f7f7',
				indicatorStyle: { backgroundColor: '#ff2e51' },
				style: { backgroundColor: '#232c39' }
			}}
		>
			<TabNavigator.Screen name='Decks' component={DeckListView} />
			<TabNavigator.Screen name='New' component={NewDeckView} />
		</TabNavigator.Navigator>
	);
};
