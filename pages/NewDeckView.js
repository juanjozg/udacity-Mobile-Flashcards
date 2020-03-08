import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	Platform,
	Alert
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { CustomButton } from '../components/CustomButton';
//Icons
import { Ionicons } from '@expo/vector-icons';

class NewDeckView extends Component {
	static propTypes = {
		prop: PropTypes.any
	};
	state = { newDeckTitle: '', submitted: false };
	handleSubmitDeck() {
		const { newDeckTitle } = this.state;
		if (newDeckTitle === '') {
			this.setState({ submitted: true });
			return;
		}
		if (this.props.decks[newDeckTitle]) {
			Alert.alert(
				`New Deck - "${newDeckTitle}"`,
				'There is already a deck with that name. Do you want to override it?',
				[
					{
						text: 'No way',
						onPress: () =>
							this.setState({
								newDeckTitle: ''
							}),
						style: 'cancel'
					},
					{ text: 'Yes', onPress: () => this.submitDeck() }
				],
				{ cancelable: false }
			);
		} else {
			this.submitDeck();
		}
	}

	submitDeck() {
		const { newDeckTitle } = this.state;
		this.props.dispatch(addDeck(newDeckTitle));
		this.setState({
			newDeckTitle: '',
			submitted: false
		});
		this.props.navigation.reset({
			index: 0,
			routes: [
				{
					name: 'TabView'
				},
				{
					name: 'DeckView',
					params: {
						deckId: newDeckTitle
					}
				}
			]
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.deckIcon}>
						<Ionicons
							name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
							size={60}
							color={'#ff2e51'}
						/>
					</View>
					<Text style={styles.subtextHeader}>Every deck needs a title!</Text>
					<Text style={styles.textHeader}>
						What is the title of your new deck?
					</Text>
					<TextInput
						style={styles.input}
						onChangeText={(newDeckTitle) => this.setState({ newDeckTitle })}
						value={this.state.newDeckTitle}
						underlineColorAndroid={'#ff2e51'}
					></TextInput>
					{this.state.submitted && this.state.newDeckTitle === '' ? (
						<Text style={{ color: '#ff2e51', fontSize: 12, paddingLeft: 6 }}>
							That's not a valid name for a deck!
						</Text>
					) : null}
				</View>
				<CustomButton
					onPress={() => this.handleSubmitDeck()}
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
	deckIcon: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 30
	},
	subtextHeader: {
		fontSize: 16,
		textAlign: 'left',
		fontWeight: '300',
		textAlign: 'center',
		color: '#232c39',
		marginTop: 10,
		marginBottom: 10
	},
	textHeader: {
		fontSize: 24,
		textAlign: 'left',
		fontWeight: '300',
		marginBottom: 16,
		textAlign: 'center',
		color: '#232c39'
	},
	input: {
		height: 40,
		paddingLeft: 6,
		color: '#232c39'
	},
	textSubmit: {
		color: '#f7f7f7',
		fontSize: 18
	}
});

const mapStateToProps = (decks) => {
	return {
		decks
	};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps)(NewDeckView);
