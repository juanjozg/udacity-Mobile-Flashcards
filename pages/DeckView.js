import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class DeckView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};

	render() {
		const { deck } = this.props;
		return (
			<View style={styles.container}>
				<View style={styles.textContainer}>
					<Text style={styles.title}>{deck.title}</Text>
					<Text style={styles.subtitle}>
						{deck.questions.length} card
						{deck.questions.length === 1 ? '' : 's'}
					</Text>
				</View>
				<View style={styles.buttonsContainer}>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('NewQuestionView', {
								deckId: deck.title
							})
						}
						style={styles.btnAdd}
					>
						<Text style={styles.textAdd}>Add Card</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							this.props.navigation.navigate('QuizView', {
								deckId: deck.title
							})
						}
						style={styles.btnQuiz}
					>
						<Text style={styles.textQuiz}>Start Quiz</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	textContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
		flex: 1
	},
	buttonsContainer: {
		justifyContent: 'center',
		alignSelf: 'center',
		flex: 1
	},
	title: {
		fontSize: 40,
		padding: 8
	},
	subtitle: {
		fontSize: 24,
		color: 'grey',
		textAlign: 'center'
	},
	btnAdd: {
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 32,
		paddingLeft: 32,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black',
		marginBottom: 8
	},
	btnQuiz: {
		backgroundColor: 'black',
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 32,
		paddingLeft: 32,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black'
	},
	textAdd: {
		fontSize: 18,
		color: 'black'
	},
	textQuiz: {
		fontSize: 18,
		color: 'white'
	}
});
const mapStateToProps = (decks, { route }) => {
	const deckId = route.params.deckId;
	const deck = decks[deckId];
	return {
		deck
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);
