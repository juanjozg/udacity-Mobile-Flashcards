//React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//React Native
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Redux
import { connect } from 'react-redux';
import { receiveDecks, loadInitialDecksFromStorage } from '../actions';
//API
import { saveDeckTitle, getDecks } from '../utils/api';
//Helpers
import { clearAsyncStorage } from '../utils/helpers';
//Icons
import { Ionicons } from '@expo/vector-icons';

class DeckListView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};
	componentDidMount() {
		getDecks().then((initialDecks) => {
			this.props.dispatch(
				loadInitialDecksFromStorage(JSON.parse(initialDecks))
			);
		});
	}
	renderListCard(deck) {
		return (
			<TouchableOpacity
				style={styles.deck}
				onPress={() =>
					this.props.navigation.navigate('DeckView', { deckId: deck.title })
				}
			>
				<Text style={styles.title}>{deck.title}</Text>
				<Text style={styles.subtitle}>
					{deck.questions.length} card
					{deck.questions.length === 1 ? '' : 's'}
				</Text>
			</TouchableOpacity>
		);
	}
	render() {
		const { decks } = this.props;
		return (
			<View style={styles.container}>
				<FlatList
					data={Object.keys(decks)}
					renderItem={({ item }) => this.renderListCard(decks[item])}
					keyExtractor={(deck, index) => index.toString()}
				/>
				<View style={styles.btnClearStorage}>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
						size={20}
						color={'white'}
					/>
					<TouchableOpacity
						title='Clear Storage'
						onPress={() => clearAsyncStorage()}
					>
						<Text style={styles.textBtnClear}>Clear storage</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	deck: {
		flex: 1,
		padding: 8,
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomWidth: 0.5,
		borderColor: '#d6d7da'
	},
	title: {
		fontSize: 24
	},
	subtitle: {
		fontSize: 16,
		color: 'grey'
	},
	btnClearStorage: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'deepskyblue',
		color: 'white'
	},
	textBtnClear: {
		fontSize: 16,
		color: 'white',
		fontWeight: '400',
		margin: 5
	}
});

const mapStateToProps = (decks) => {
	return {
		decks
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(DeckListView);
