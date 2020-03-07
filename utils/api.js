import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'UdaciCards:decks';

// getDecks: return all of the decks along with their titles, questions, and answers.
export function getDecks() {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY);
}
// getDeck: take in a single id argument and return the deck associated with that id.
export function getDeck(deckId) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
		return JSON.parse(decks)[deckId];
	});
}
// saveDeckTitle: take in a single title argument and add it to the decks.
export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(
		DECKS_STORAGE_KEY,
		JSON.stringify({ [title]: { title, questions: [] } })
	);
}
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.
export function addCardToDeck(title, card) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY).then((decks) => {
		const newDeck = { [title]: JSON.parse(decks)[title] };
		newDeck[title].questions = [...newDeck[title].questions, card];
		AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(newDeck));
	});
}
/*
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
*/
