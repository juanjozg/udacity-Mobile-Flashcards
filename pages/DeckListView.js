//React
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//React Native
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
//Redux
import { connect } from 'react-redux';
import { loadInitialDecksFromStorage } from '../actions';
//API
import { getDecks } from '../utils/api';
//Helpers
import { clearAsyncStorage } from '../utils/helpers';
//Icons
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../components/CustomButton';

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
				<CustomButton
					iconPosition='start'
					title='Clear Storage'
					onPress={() => clearAsyncStorage()}
				>
					<Ionicons
						name={Platform.OS === 'ios' ? 'ios-trash' : 'md-trash'}
						size={24}
						color={'#f7f7f7'}
					/>
				</CustomButton>
				<FlatList
					data={Object.keys(decks)}
					renderItem={({ item }) => this.renderListCard(decks[item])}
					keyExtractor={(deck, index) => index.toString()}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		margin: 15
	},
	deck: {
		flex: 1,
		padding: 16,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 15,
		marginTop: 5,
		marginBottom: 5,
		backgroundColor: '#232c39'
	},
	title: {
		fontSize: 24,
		color: '#f7f7f7'
	},
	subtitle: {
		fontSize: 16,
		color: 'grey'
	},
	btnClearStorage: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ff2e51',
		color: '#f7f7f7'
	},
	textBtnClear: {
		fontSize: 16,
		color: '#f7f7f7',
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
