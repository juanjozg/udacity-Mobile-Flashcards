import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

export const CustomButton = (props) => {
	const {
		title = 'Enter',
		style = {},
		textStyle = {},
		iconPosition = 'start',
		onPress,
		children
	} = props;

	return (
		<TouchableOpacity onPress={onPress} style={[styles.button, style]}>
			{iconPosition === 'start' ? (
				<View style={[styles.icon]}>{children}</View>
			) : null}
			<Text style={[styles.text, textStyle]}>{props.title}</Text>
			{iconPosition === 'end' ? (
				<View style={[styles.icon]}>{children}</View>
			) : null}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		height: 50,
		borderRadius: 5,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',

		backgroundColor: '#ff2e51',
		shadowColor: '#ff2e51',
		shadowOpacity: 0.4,
		shadowOffset: { height: 10, width: 0 },
		shadowRadius: 20
	},

	text: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: '#f7f7f7'
	},
	icon: {
		margin: 5
	}
});
