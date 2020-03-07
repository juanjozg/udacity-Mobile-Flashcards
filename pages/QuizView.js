import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class QuizView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};

	state = {
		showQuestion: true,
		indexOfCardPlaying: 0,
		numCorrectAns: 0
	};
	handleCorrectAnswer(indexOfCardPlaying) {
		this.setState({
			numCorrectAns: this.state.numCorrectAns + 1,
			indexOfCardPlaying: this.state.indexOfCardPlaying + 1,
			showQuestion: true
		});
	}
	handleIncorrectAnswer(indexOfCardPlaying) {
		this.setState({
			indexOfCardPlaying: this.state.indexOfCardPlaying + 1,
			showQuestion: true
		});
	}
	render() {
		const { cards, deckId } = this.props;
		const { showQuestion, indexOfCardPlaying } = this.state;

		if (cards.length === 0) {
			return (
				<View>
					<Text>You need to add atleast 1 card to play a deck!</Text>
				</View>
			);
		} else if (indexOfCardPlaying === cards.length) {
			return (
				<View>
					<Text>Completed!</Text>
					<Text>
						{this.state.numCorrectAns} out of {cards.length}
					</Text>
					<TouchableOpacity
						style={styles.btnCorrect}
						onPress={() =>
							this.setState({
								showQuestion: true,
								indexOfCardPlaying: 0,
								numCorrectAns: 0
							})
						}
					>
						<Text style={styles.textSubmit}>Restart Quiz</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnCorrect}
						onPress={() =>
							this.props.navigation.navigate('DeckView', { deckId })
						}
					>
						<Text style={styles.textSubmit}>Back to Deck</Text>
					</TouchableOpacity>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.numberOfCards}>
					{indexOfCardPlaying + 1}/{cards.length}
				</Text>
				{showQuestion ? (
					<Text style={styles.textHeader}>
						{cards[indexOfCardPlaying].question}
					</Text>
				) : (
					<Text style={styles.textHeader}>
						{cards[indexOfCardPlaying].answer}
					</Text>
				)}
				<TouchableOpacity
					onPress={() => this.setState({ showQuestion: !showQuestion })}
				>
					{showQuestion ? (
						<Text style={styles.textAnswer}>Answer</Text>
					) : (
						<Text style={styles.textAnswer}>Question</Text>
					)}
				</TouchableOpacity>
				<View style={styles.btnContainer}>
					<TouchableOpacity
						style={styles.btnCorrect}
						onPress={() => this.handleCorrectAnswer(indexOfCardPlaying)}
					>
						<Text style={styles.textSubmit}>Correct</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btnIncorrect}
						onPress={() => this.handleIncorrectAnswer(indexOfCardPlaying)}
					>
						<Text style={styles.textSubmit}>Incorrect</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		flex: 1
	},
	numberOfCards: {
		fontSize: 16,
		margin: 16
	},
	textHeader: {
		fontSize: 48,
		textAlign: 'center',
		margin: 24
	},
	input: {
		marginTop: 24,
		marginBottom: 24,
		marginLeft: 16,
		marginRight: 16,
		borderRadius: 5,
		borderWidth: 1,
		padding: 8
	},
	textAnswer: {
		color: 'darkred',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	btnContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		marginRight: 96,
		marginLeft: 96
	},
	btnCorrect: {
		backgroundColor: 'green',
		marginTop: 24,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 38,
		paddingLeft: 38,
		borderRadius: 5
	},
	btnIncorrect: {
		backgroundColor: 'red',
		marginTop: 24,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 38,
		paddingLeft: 38,
		borderRadius: 5
	},
	textSubmit: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18
	}
});

const mapStateToProps = (decks, { route }) => {
	const deckId = route.params.deckId;
	const deck = decks[deckId];

	return {
		deckId: deckId,
		cards: deck.questions
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(QuizView);
