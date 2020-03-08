import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';
class DeckView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};

	render() {
		const { deck } = this.props;
		return (
			<View style={styles.container}>
				<View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.subtitle}>
						{deck.questions.length} card
						{deck.questions.length === 1 ? '' : 's'}
					</Text>
					<CustomButton
						onPress={() =>
							this.props.navigation.navigate('NewQuestionView', {
								deckId: deck.title
							})
						}
						title='Add Card'
						style={{ width: 150 }}
					>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
							size={24}
							color={'#f7f7f7'}
						/>
					</CustomButton>
				</View>
				<CustomButton
					onPress={() =>
						this.props.navigation.navigate('QuizView', {
							deckId: deck.title
						})
					}
					title='Start Quiz'
				></CustomButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 15,
		justifyContent: 'space-around',
		textAlign: 'center'
	},
	title: {
		fontSize: 48,
		color: '#232c39'
	},
	subtitle: {
		fontSize: 24,
		color: 'grey',
		textAlign: 'center',
		marginTop: 5,
		marginBottom: 25
	}
});

const mapStateToProps = (decks, { route }) => {
	const deckId = route.params.deckId;
	const deck = decks[deckId];
	return {
		deck
	};
};

export default connect(mapStateToProps)(DeckView);
