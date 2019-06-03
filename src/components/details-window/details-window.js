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

        // Get image url, headline string, and blurb text
        const imgUrl = gameInfo.editorial.recap.mlb.image.cuts[0].src;
        const headlineStr = gameInfo.editorial.recap.mlb.headline;
        const blurbStr = gameInfo.editorial.recap.mlb.blurb;

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
