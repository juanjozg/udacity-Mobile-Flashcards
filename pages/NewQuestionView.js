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
import { CustomButton } from '../components/CustomButton';

class NewQuestionView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};

	state = {
		question: '',
		answer: '',
		submitted: false
	};
	handleSubmitCardToDeck() {
		if (this.state.question === '' || this.state.answer === '') {
			this.setState({ submitted: true });
			return;
		}
		this.addCardToDeck();
	}
	addCardToDeck() {
		const { deckId } = this.props;
		const card = {
			question: this.state.question,
			answer: this.state.answer
		};
		this.setState({
			question: '',
			answer: '',
			submitted: false
		});
		this.props.dispatch(addCard(deckId, card));
		this.props.navigation.goBack();
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<Text style={styles.textHeader}>
						Every card needs a question... and its answer!
					</Text>
				</View>
				<View>
					<Text style={styles.label}>Here goes the question</Text>
					<TextInput
						style={styles.input}
						onChangeText={(question) => this.setState({ question })}
						value={this.state.question}
						underlineColorAndroid={'#ff2e51'}
					></TextInput>
					{this.state.submitted && this.state.question === '' ? (
						<Text style={{ color: '#ff2e51', fontSize: 12, paddingLeft: 6 }}>
							That's not a valid question!
						</Text>
					) : null}
					<Text style={[styles.label, { marginTop: 15 }]}>
						and here goes the answer
					</Text>
					<TextInput
						style={styles.input}
						onChangeText={(answer) => this.setState({ answer })}
						value={this.state.answer}
						underlineColorAndroid={'#ff2e51'}
					></TextInput>
					{this.state.submitted && this.state.answer === '' ? (
						<Text style={{ color: '#ff2e51', fontSize: 12, paddingLeft: 6 }}>
							That's not a valid answer!
						</Text>
					) : null}
				</View>
				<CustomButton
					onPress={() => this.handleSubmitCardToDeck()}
					title='Submit'
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
	textHeader: {
		fontSize: 24,
		textAlign: 'left',
		fontWeight: '300',
		textAlign: 'center',
		color: '#232c39'
	},
	label: {
		fontSize: 16,
		fontWeight: '300',
		textAlign: 'center',
		color: '#232c39'
	},
	input: {
		height: 40,
		paddingLeft: 6,
		color: '#232c39'
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
