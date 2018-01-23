/* @flow */

import * as React from 'react';
import './guitar.scss'


type State = {
	showChord: array,
	currKey: string,
	currType: string,
	intervals: array,
	AllNotes: array,
	mask: array,
	types: array,
	Octaves: array,
};

export default class extends React.Component<State> {
	
	state = {
		showChord: [],
		currKey: '',
		currType: 'Major',
		intervals: [],
		AllNotes: [],
		mask: [],
		types: [],
		Octaves: [],
	};
	
	componentDidMount() {
		let mask = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'];
		let Octaves = [mask, mask, mask, mask, mask, mask, mask, mask, mask];
		let AllNotes = [];
		for (let item of Octaves) {
			AllNotes = [...AllNotes, ...item]
		}
		
		let intervals = {
			P0: 0,
			S1: 1,
			S2: 2,
			T3: 3,
			T4: 4,
			Q1: 5,
			Q2: 6,
			QE1: 6,
			QE2: 7,
			SX1: 8,
			SX2: 9,
			SE1: 10,
			SE2: 11,
			O: 12,
		};
		
		this.setState({
			intervals,
			AllNotes,
			mask,
			Octaves,
			types: [
				{
					name: 'Major',
					intervals: [intervals.P0, intervals.T4, intervals.QE2]
				},
				{
					name: 'Minor',
					intervals: [intervals.P0, intervals.T3, intervals.QE2]
				},
				{
					name: 'Sept',
					intervals: [intervals.P0, intervals.T4, intervals.QE2, intervals.SE1]
				}],
			
		}, this.changeChord())
	}
	
	changeChord = () => {
		const [key, type] = [this.state.currKey, this.state.currType];
		const doubleOctave = [...this.state.mask, ...this.state.mask];
		
		const findAllNotes = (key: string, type: array) => {
			const result = () => {
				let firstNoteIndex = Object.values(doubleOctave).indexOf(key);
				let firstNote = doubleOctave[firstNoteIndex + type[0]];
				let secondNote = doubleOctave[firstNoteIndex + type[1]];
				let thirdNote = doubleOctave[firstNoteIndex + type[2]];
				let fourNote = doubleOctave[firstNoteIndex + type[3]];
				
				return [firstNote, secondNote, thirdNote, fourNote]
			};
			this.setState({ showChord: result() })
		};
		
		
		this.state.types.forEach(item => {
			(item.name === type) && findAllNotes(key, item.intervals)
		})
		
	};
	
	changeKey = (key: string) => {
		this.setState({ currKey: key }, () => this.changeChord())
	};
	changeType = (type: array) => {
		this.setState({ currType: type }, () => this.changeChord())
	};
	
	render() {
		let { P0, T4, Q1, Q2, O } = this.state.intervals;
		
		let [String6, String5, String4, String3, String2, String1] = [P0, Q1, Q1 + Q1, Q1 + Q1 + Q1, Q1 + Q1 + Q1 + T4, O + O];
		
		const String = (note: number) => {
			let guitarOctave = O * 4;
			let index = note + guitarOctave;
			return {
				key: this.state.AllNotes[index],
				index
			}
		};
		let guitarTuning = [String(String1), String(String2), String(String3), String(String4), String(String5), String(String6)];
		
		
		const CurrString = (note: object) => {
			return this.state.AllNotes.slice(note.index, note.index + O * 1.5)
				.map(key =>
					<li key={`${++note.index}${key}`} onClick={() => this.changeKey(key)}>
						{
							this.state.showChord.includes(key) ?
								<span className='active'>{key}</span> :
								<span>{key}</span>
							
						}
					</li>
				)
		};
		
		const ButtonsType = () =>
			this.state.types.map((type, i) => {
				let bgcolor = type.name === this.state.currType ? '#CCC' : '#AAA';
				return <button key={`${type.name}+1`}
							   onClick={() => this.changeType(type.name)}
							   style={{ backgroundColor: bgcolor }}>{type.name}</button>
			});
		
		const ButtonsKeys = () =>
			this.state.mask.map((key, i) => {
				let bgcolor = key === this.state.currKey ? '#CCC' : '#AAA';
				return <button key={`${i}+1`} onClick={() => this.changeKey(key)}
							   style={{ backgroundColor: bgcolor }}>{key}</button>
			});
		
		const RenderStrings = () =>
			guitarTuning.map((note, i) =>
					<ul key={i} className='StringRow_list'>
						{
							CurrString(note)
						}
					</ul>
				);
		
		return (
			<section>
				<div className='contentView'>
					<h1>Guitar</h1>
					<a href='https://github.com/scoutrul/frontstart/blob/master/src/components/pages/works/Guitar.js' target='blank'>GitHub Source</a>
					<div className='guitar'>
						<div className='info'>
							<div className='keytype'>
								<div className='key'>{this.state.currKey} </div>
								<div className='type'>{this.state.currType}</div>
							</div>
							<div className='buttons'>
								<ButtonsType/>
								<hr/>
								<ButtonsKeys/>
							</div>
						</div>
						<div className='StringRow'>
							<RenderStrings/>
						</div>
					
					</div>
				
				</div>
			</section>
		)
	}
}

