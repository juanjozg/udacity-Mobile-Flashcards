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
import { CustomButton } from '../components/CustomButton';

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
		const messageBack = `Go back to "${deckId}"`;
		if (cards.length === 0) {
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.textNoCards}>
							You need to add atleast 1 card to play!
						</Text>
					</View>
				</View>
			);
		} else if (indexOfCardPlaying === cards.length) {
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.textCompleted}>
							Quiz of "{deckId}" completed!
						</Text>
						<Text style={styles.textScore}>
							Score:{' '}
							<Text style={{ fontWeight: 'bold' }}>
								{this.state.numCorrectAns}
							</Text>{' '}
							out of <Text style={{ fontWeight: 'bold' }}>{cards.length}</Text>
						</Text>
					</View>
					<View>
						<CustomButton
							style={{ marginBottom: 20, backgroundColor: '#232c39' }}
							onPress={() =>
								this.setState({
									showQuestion: true,
									indexOfCardPlaying: 0,
									numCorrectAns: 0
								})
							}
							title='Restart Quiz'
						></CustomButton>
						<CustomButton
							onPress={() =>
								this.props.navigation.navigate('DeckView', { deckId })
							}
							title={messageBack}
						></CustomButton>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.container}>
				<View style={styles.statsContainer}>
					<Text style={styles.numberOfCards}>
						Card playing: #{indexOfCardPlaying + 1}
					</Text>
					<Text style={styles.numberOfCards}>
						Number of cards in deck: {cards.length}
					</Text>
				</View>
				<View style={styles.cardContainer}>
					{showQuestion ? (
						<View
							style={[
								styles.card,
								{
									backgroundColor: showQuestion ? '#f7f7f7' : '#232c39'
								}
							]}
						>
							<Text style={[styles.textQuestion]}>
								{cards[indexOfCardPlaying].question}
							</Text>
							<TouchableOpacity
								onPress={() => this.setState({ showQuestion: !showQuestion })}
							>
								<Text style={styles.textReveal}>see the answer...</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View
							style={[
								styles.card,
								{
									backgroundColor: showQuestion ? '#f7f7f7' : '#232c39'
								}
							]}
						>
							<Text style={[styles.textAnswer]}>
								{cards[indexOfCardPlaying].answer}
							</Text>
							<TouchableOpacity
								onPress={() => this.setState({ showQuestion: !showQuestion })}
							>
								<Text style={styles.textReveal}>go back to the question</Text>
							</TouchableOpacity>
						</View>
					)}
					<View>
						<CustomButton
							style={{ marginBottom: 20, backgroundColor: '#232c39' }}
							onPress={() => this.handleCorrectAnswer(indexOfCardPlaying)}
							title='Correct'
						></CustomButton>
						<CustomButton
							onPress={() => this.handleIncorrectAnswer(indexOfCardPlaying)}
							title='Incorrect'
						></CustomButton>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 15
	},
	statsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	numberOfCards: {
		fontSize: 12,
		color: '#232c39',
		fontWeight: 'bold',
		textAlign: 'right'
	},
	cardContainer: {
		flex: 1,
		textAlign: 'center'
	},
	card: {
		borderRadius: 8,
		borderWidth: 2,
		borderColor: '#232c39',
		flex: 1,
		marginTop: 12,
		marginBottom: 20,
		justifyContent: 'center',
		flex: 1,
		padding: 10
	},
	textQuestion: {
		fontSize: 24,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#232c39'
	},
	textAnswer: {
		fontSize: 24,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#f7f7f7'
	},
	textReveal: {
		fontSize: 16,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#ff2e51'
	},
	textCompleted: {
		fontSize: 38,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#232c39'
	},
	textScore: {
		fontSize: 16,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#232c39'
	},
	textNoCards: {
		fontSize: 24,
		textAlign: 'left',
		marginBottom: 16,
		textAlign: 'center',
		color: '#232c39'
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

export default connect(mapStateToProps)(QuizView);
