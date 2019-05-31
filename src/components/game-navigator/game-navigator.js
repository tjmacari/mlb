import Component from 'Components/component';
import LoadJSON from 'Components/loadjson/loadjson';

import './game-navigator.scss';
import GameItem from '../game-item/game-item';

class GameNavigator extends Component {
    constructor() {
        super(); // Must call in order to access parent scope / parent methods

        // Track previous and current slide index
        this.currIndex = -1;
        this.prevIndex = -1;

        // Create list of loaded games for the day
        this.gameItems = [];
    }

    _loadTodaysGames() {
        const date = new Date(); // Get today's date

        // Get year, month, day of month from today's date object
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Month is base-0 so add 1
        const dayOfMonth = date.getDate() - 1;

        // Inject variables into string using ${}
        return `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${year}-${month}-${dayOfMonth}&sportId=1`;
    }

    _loadGames(data, gameItems) {
        if(data && data.dates && data.dates.length > 0 && data.dates[0].games) {
            const games = data.dates[0].games;

            // Iterate through games array and build a GameItem component for each
            games.forEach((game) => {

                if(game && game.content && game.content.editorial && game.content.editorial.recap) {

                    // Create and render new game item thumbnail
                    const gameItem = new GameItem(game.content);
                    gameItem.render(gameItems);

                    // Add to array which will be referenced as user navigates through games
                    this.gameItems.push(gameItem);
                }
            });

            // Set focus to first thumbnail
            this._setIndex(0);

        } else {
            console.error("No games found for this date");
        }

        // Listen for keyboard events, apply navigation based on left/right arrow, see details if user hits enter
        this._setKeyboardInput();
    }

    _prevGame() {
        let newIndex = this.currIndex - 1;
        if(newIndex < 0) {
            newIndex = this.gameItems.length - 1; // If below 0, go to last index
        }
        this._setIndex(newIndex);
    }

    _nextGame() {
        let newIndex = this.currIndex + 1;
        if(newIndex > this.gameItems.length -1) {
            newIndex = 0; // If greater than length index, set to 0
        }
        this._setIndex(newIndex);
    }

    _gameDetails() {

    }

    _setIndex(index) {
        this.oldIndex = this.currIndex; // Save reference to old focused thumb
        this.currIndex = index; // Update new index

        // Get the dom elements for the old and new game items
        if(this.oldIndex >= 0) {
            const prevGameElem = this.gameItems[this.oldIndex].getBase();
            prevGameElem.classList.remove('focus'); // Remove focus from old item
        }

        // Set new focused game item
        const currGameElem = this.gameItems[this.currIndex].getBase();
        currGameElem.classList.add('focus'); // Remove focus from old item

        // Animate our games!
        this._animateGames(index);
    }

    _setKeyboardInput() {
        document.onkeydown = (e) => {
            if(e.keyCode === 37) {
                // Left Arrow
                this._prevGame();
            } else if(e.keyCode == 39) {
                // Right Arrow
                this._nextGame();
            } else if(e.keyCode == 13) {
                // Enter Key
                this._gameDetails();
            }
        };
    }

    // Animate parent element which contains game items
    _animateGames(index) {

        // Calculate new left position for parent element which contains game thumbnails
        const unfocusedWidth = 160;
        const marginWidth = 20;
        const finalLeft = 0 - ((unfocusedWidth + marginWidth) * index);

        // Apply new position
        const gameItemsElem = this.base.querySelector(".game-items");
        gameItemsElem.style.marginLeft = `${finalLeft}px`;
    }

    // Load JSON and use data to populate thumbnails
    render(parent) {

        this.base = this.createElem("game-navigator");
        parent.append(this.base);

        const gameItems = this.createElem("game-items");
        this.base.append(gameItems);

        // Load MLB JSON
        const jsonUrl = this._loadTodaysGames(); // Inject today's date into url
        
        // Once promise is fulfilled, load games
        LoadJSON.load(jsonUrl)
            .then((data) => {
                this._loadGames(data, gameItems); // Once data is loaded, start loading games
            })
            .catch((err) => {
                console.error(err); // Show error if applicable
            });
    }
}
export default GameNavigator;
