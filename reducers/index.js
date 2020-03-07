import {
	RECEIVE_DECKS,
	ADD_DECK,
	LOAD_INITIAL_DECKS_FROM_STORAGE,
	ADD_CARD
} from '../actions';
import { saveDeckTitle, addCardToDeck } from '../utils/api';

function decks(state = [], action) {
	switch (action.type) {
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_DECK:
			saveDeckTitle(action.deck);
			return {
				...state,
				[action.deck]: {
					title: action.deck,
					questions: []
				}
			};
		case LOAD_INITIAL_DECKS_FROM_STORAGE:
			return {
				...state,
				...action.decks
			};
		case ADD_CARD:
			addCardToDeck(action.title, action.card);
			return {
				...state,
				[action.title]: {
					...state[action.title],
					questions: [
						...state[action.title].questions,
						{
							question: action.card.question,
							answer: action.card.answer
						}
					]
				}
			};
		default:
			return state;
	}
}

export default decks;
