export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const LOAD_INITIAL_DECKS_FROM_STORAGE =
	'LOAD_INITIAL_DECKS_FROM_STORAGE';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	};
}
export function loadInitialDecksFromStorage(decks) {
	return {
		type: LOAD_INITIAL_DECKS_FROM_STORAGE,
		decks
	};
}
export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	};
}
export function addCard(title, card) {
	return {
		type: ADD_CARD,
		title,
		card
	};
}
