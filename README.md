# udacity-Mobile-Flashcards

Project React Native created with expo client.

```
actions
|--index
components
|--CustomButton
pages
|--DeckListView
|--DeckView
|--NewDeckView
|--NewQuestionView
|--QuizView
reducers
|--index
utils
|--api
|--helpers
app
```
### pages
- DeckListView: *Home view as the first tab. Initial load of data from Async Storage. List of decks availables.*
- DeckView: *Handle notifications flow. Detail of decks. Start Quiz or Add Card access.*
- NewDeckView: *Create a new Deck only with the title as input. Saved in AsyncStorage and Redux.*
- NewQuestionView: *Create a new card with question and answer as inputs. Saved in AsyncStorage and Redux.*
- QuizView: *View for all the states in the Quiz. (Message invalid deck for quiz, Quiz Completed, Main view with the questions and the answers)*
### api
- getDecks: *return all of the decks along with their titles, questions, and answers.*
- getDeck: *take in a single id argument and return the deck associated with that id.*
- saveDeckTitle: *take in a single title argument and add it to the decks.*
- addCardToDeck: *take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.*
### app
*Set the notification.
Set redux environment.
Navigation containers (Tabs and Stack).*
### helpers
*Notifications functions. Clear async storage function for testing with new data.*
## Tested with expo in genymotion in Google Pixel 2 XL:
- Android 8.0
- API 26
- Size 1440 x 2880
- Density 560

**Tested physically in the device: Samsung S10e (Android).**
