// Import common abstract parent
import Component from 'Components/component';

// Add styling
import './details-window.scss';

class DetailsWindow extends Component {
    constructor() {
        super(); // Must call in order to access parent scope / parent methods

        this.isActive = false; // Default to not active
    }

    // Toggle details window
    toggleActive() {
        this.isActive = !this.isActive;
        if(this.isActive) {
            this.base.classList.remove('hide');
        } else {
            this.base.classList.add('hide');
        }
    }

    // Update content in details window
    update(gameInfo) {
        const recap = gameInfo.editorial.recap.mlb;

        // Get date, image url, headline string, and blurb text
        const dateStr = new Date(recap.date).toDateString(); // ie: Wed May 29 2019
        const imgUrl = recap.image.cuts[0].src;
        const headlineStr = recap.headline;
        const blurbStr = `${dateStr}<br/><br/>${recap.blurb}`;

        // Background image
        this.setBgImage(this.content, imgUrl);

        // Apply headline
        this.applyContent(this.headline, headlineStr);

        // Apply blurb
        this.applyContent(this.blurb, blurbStr);
    }

    // Create DOM elements
    render(parent) {
        // Base container for details window
        this.base = this.createElem(["details-window", "hide"], parent);

        // Content with BG image and text
        this.content = this.createElem(["box", "content"], this.base);

        // Text pane/container
        this.textPane = this.createElem(["text-pane"], this.content);

        // Headline
        this.headline = this.createElem(["headline"], this.textPane);

        // Blurb
        this.blurb = this.createElem(["blurb"], this.textPane);
    }
}
export default DetailsWindow;
