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
import { saveDeckTitle } from '../utils/api';
import { addDeck } from '../actions';

class NewDeckView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};
	state = { newDeckTitle: '' };
	submitDeck() {
		const { newDeckTitle } = this.state;
		this.props.dispatch(addDeck(this.state.newDeckTitle));
		this.setState({
			newDeckTitle: ''
		});
		this.props.navigation.navigate('DeckView', {
			deckId: newDeckTitle
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.textHeader}>
					What is the title of your new deck?
				</Text>
				<TextInput
					style={styles.input}
					onChangeText={(newDeckTitle) => this.setState({ newDeckTitle })}
					value={this.state.newDeckTitle}
				></TextInput>
				<TouchableOpacity
					style={styles.btnStartQuiz}
					onPress={() => this.submitDeck()}
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps)(NewDeckView);
