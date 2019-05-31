
// Load SASS for styling
import './app.scss';
import GameNavigator from './components/game-navigator/game-navigator';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // Grab an instance of our root element
    const appTag = document.querySelector('#app');

    // Initialize game navigator component
    const gameNavigator = new GameNavigator();
    gameNavigator.render(appTag); // Pass in appTag as parent element
});