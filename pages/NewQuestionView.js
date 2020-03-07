import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCard } from '../actions';

class NewQuestionView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};

	state = {
		question: '',
		answer: ''
	};

	addCardToDeck() {
		const { deckId } = this.props;
		const card = {
			question: this.state.question,
			answer: this.state.answer
		};
		this.props.dispatch(addCard(deckId, card));
		this.props.navigation.goBack();
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					style={styles.input}
					placeholder='Type here your question!'
					onChangeText={(question) => this.setState({ question })}
					value={this.state.question}
				></TextInput>
				<TextInput
					style={styles.input}
					placeholder='Type here the answer!'
					onChangeText={(answer) => this.setState({ answer })}
					value={this.state.answer}
				></TextInput>
				<TouchableOpacity
					style={styles.btnStartQuiz}
					onPress={() => this.addCardToDeck()}
				>
					<Text style={styles.textSubmit}>Submit</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		flex: 1
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
	btnStartQuiz: {
		backgroundColor: 'black',
		marginTop: 24,
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 38,
		paddingLeft: 38,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: 'black',
		alignSelf: 'center'
	},
	textSubmit: {
		color: 'white',
		fontSize: 18
	}
});

const mapStateToProps = (decks, { route }) => {
	const deckId = route.params.deckId;
	return {
		deckId
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(NewQuestionView);
