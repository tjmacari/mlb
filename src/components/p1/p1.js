import React from 'react';
import TmComponent from 'Components/component';
import './p1.scss';

class TmPageOne extends TmComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.update("mounted");
    }

    render() {
        return (
            <section className="p1">
                <header></header>
                <main>{
                    this.props.info.map((item, i) => (
                        <div key={i}>{item.id}</div>
                    )
                )}</main>
                <footer></footer>
            </section>
        );
    }
}
export default TmPageOne;
