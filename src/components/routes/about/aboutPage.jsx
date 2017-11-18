    import React, {Component} from 'react'
    import Transition from 'react-transition-group/Transition'
    import './about.scss'

    const duration = 500;

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0
    }

    const transitionStyles = {
        entering: { opacity: 1 },
        entered: { opacity: 1 },
        exiting:{ opacity: 0 },
        exited: { opacity: 0 }
    }

    const Fade = ({ in: inProp }) => {
        console.log('some', inProp)
        return (
        <Transition in={inProp} timeout={duration}>
        {
            (state) => (
            <section style={{
            ...defaultStyle,
            ...transitionStyles[state]
            }}>
            <h1>Hello! My name is Anton</h1>
            <div>HTML -> CSS -> JSX -> JQUERY -> REACT -> REDUX</div>
            <div>Year 2000 2010 2015 2017</div>
            </section>
        )}
        </Transition>
    )}

    export default class AboutPage extends Component {

        state = { show: false }

        fadeHandler = () => this.setState({ show: !this.state.show })

        render(){
            return (
                <div>
                    <Fade in={this.state.show} />
                    <button onClick={this.fadeHandler}>клик</button>
                </div>
            )
        }
    }
