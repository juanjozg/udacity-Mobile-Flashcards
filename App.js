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
import { clearAsyncStorage } from './utils/helpers';

const DeckListStack = createStackNavigator();
const TabNavigator = createMaterialTopTabNavigator();

export default class App extends React.Component {
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
								headerStatusBarHeight: 0,
								headerTintColor: 'white',
								headerStyle: {
									backgroundColor: 'black'
								},
								title: 'udacicards'
							}}
						/>
						<DeckListStack.Screen
							name='NewQuestionView'
							component={NewQuestionView}
							options={{
								headerStatusBarHeight: 0,
								headerTintColor: 'white',
								headerStyle: {
									backgroundColor: 'black'
								},
								title: 'Add Card'
							}}
						/>
						<DeckListStack.Screen
							name='QuizView'
							component={QuizView}
							options={{
								headerStatusBarHeight: 0,
								headerTintColor: 'white',
								headerStyle: {
									backgroundColor: 'black'
								},
								title: 'Quiz'
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
		<TabNavigator.Navigator>
			<TabNavigator.Screen name='Decks' component={DeckListView} />
			<TabNavigator.Screen name='New Deck' component={NewDeckView} />
		</TabNavigator.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
