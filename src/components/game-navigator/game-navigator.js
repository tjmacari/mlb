import Component from 'Components/component';
import LoadJSON from 'Components/loadjson/loadjson';

import './game-navigator.scss';
import GameItem from 'Components/game-item/game-item';
import DetailsWindow from 'Components/details-window/details-window';

class GameNavigator extends Component {

    constructor() {
        super(); // Must call in order to access parent scope / parent methods

        // Track previous and current slide index
        this.currIndex = -1;
        this.prevIndex = -1;

        // Create list of loaded games for the day
        this.gameItems = [];
    }

    /*
        Only completed games with recaps will show up
        PST is 7 hours ahead of GMT, ie: 7PM EST == 11PM GMT
        With that in mind, unless it's between 8PM-12AM EST (12AM-4AM GMT), show yesterday's games
    */
    _loadGamesData() {

        const date = new Date(); // Get today's date

        // Since we deal with multiple times zones, let's work with GMT
        const gmtYear = date.getUTCFullYear();
        const gmtMonth = date.getUTCMonth() + 1; // Month is base-0, so add 1
        const gmtHourOfDay = date.getUTCHours();
        const earliestHour = 1; // 1AM GMT (9PM EST)
        const latestHour = 4; // 4AM GMT (12AM EST)

        // In this case, worth spelling it out instead of ternary operator for ease of reading
        let daysAgo = 1; // Default to yesterday to get full slate of games
        if(gmtHourOfDay >= earliestHour && gmtHourOfDay < latestHour) {
            daysAgo = 0; // Since we are between 8PM - 12AM PST, we can roll with games from today
        }

        const gmtDayOfMonth = date.getUTCDate() - daysAgo;

        // Inject variables into string using ${}
        return `http://statsapi.mlb.com/api/v1/schedule?hydrate=game(content(editorial(recap))),decisions&date=${gmtYear}-${gmtMonth}-${gmtDayOfMonth}&sportId=1`;
    }

    // Use JSON info and start loading game items
    _loadGames(data, gameItems) {

        // If data is data from json is valid, start building game items
        if(data && data.dates && data.dates.length > 0 && data.dates[0].games) {
            const games = data.dates[0].games;

            // Iterate through games array and build a GameItem component for each
            games.forEach((game) => {

                // Ensure we have a valid recap, otherwise do not show this game
                if(game && game.content && game.content.editorial && game.content.editorial.recap) {
                    // Create and render new game item thumbnail
                    const gameItem = new GameItem(game.content);
                    gameItem.render(gameItems);

                    // Add to array which will be referenced as user navigates through games
                    this.gameItems.push(gameItem);
                }
            });
        } else {
            console.error("No games found for this date");
        }

        // When user hits 'enter', show game details window
        this._createDetailsWindow();

        // Listen for keyboard events, apply navigation based on left/right arrow, see details if user hits enter
        this._setKeyboardInput();

        // Set focus to first thumbnail
        this._setIndex(0);
    }

    // Decrement to previous game
    _prevGame() {
        let newIndex = this.currIndex - 1;
        if(newIndex < 0) {
            newIndex = this.gameItems.length - 1; // If below 0, go to last index
        }
        this._setIndex(newIndex);
    }

    // Increment to next game item
    _nextGame() {
        let newIndex = this.currIndex + 1;
        if(newIndex > this.gameItems.length -1) {
            newIndex = 0; // If greater than length index, set to 0
        }
        this._setIndex(newIndex);
    }

    // Toggle details window on/off
    _toggleGameDetails() {
        this.detailsWindow.toggleActive();
    }

    // Update the image, info displayed in details window
    _updateDetailsWindow() {
        const game = this.gameItems[this.currIndex]; // Grab correct game based on current index
        this.detailsWindow.update(game.data); // Call update function
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

        // Update detail pane
        this._updateDetailsWindow();

        // Animate our games!
        this._animateGames(index);
    }

    // Apply left/right/enter keyboard keys
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
                this._toggleGameDetails();
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

    _createDetailsWindow() {
        // #app element tag
        const appTag = document.querySelector('#app');

        // Initialise DetailsWindow class, pass in parent dom element as container
        this.detailsWindow = new DetailsWindow();
        this.detailsWindow.render(appTag);
    }

    // Load JSON and use data to populate thumbnails
    render(parent) {
        this.base = this.createElem(["game-navigator"], parent); // Create base container

        const gameItems = this.createElem(["game-items"], this.base); // Container for games, which will move left/right from arrows

        // Load MLB JSON
        const jsonUrl = this._loadGamesData(); // Inject today's date into url
        
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
