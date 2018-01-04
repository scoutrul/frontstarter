/* @flow */

import * as React from 'react';
import './guitar.scss'


type Props = {};
type State = {
	showChord: array,
	currKey: string,
	currType: string,
	intervals: array,
	Notes: array,
	mask: array,
	types: array,
	Octaves: array,
};

export class Guitar extends React.Component<Props, State> {
	
	state = {
		showChord: [],
		currKey: 'C',
		currType: 'Major',
		intervals: [],
		Notes: [],
		mask: [],
		types: [],
		Octaves: [],
	};
	
	
	componentDidMount() {
		this.changeChord()
	}
	
	componentWillMount() {
		let mask = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'];
		let Octaves = [mask, mask, mask, mask, mask, mask, mask, mask, mask];
		let Notes = [];
		for (let item of Octaves) {
			Notes = [...Notes, ...item]
		}
		
		let intervals = {
			O: 12,
			P0: 0,
			Q1: 5,
			Q2: 6,
			QE1: 6,
			QE2: 7,
			S1: 1,
			S2: 2,
			SE1: 10,
			SE2: 11,
			SX1: 8,
			SX2: 9,
			T3: 3,
			T4: 4
		};
		
		this.setState({
			intervals,
			Notes,
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
			
		})
	}
	
	changeChord = () => {
		const [key, type] = [this.state.currKey, this.state.currType];
		const doubleOctave = [...this.state.mask, ...this.state.mask];
		
		const findNotes = (key: string, type: array) => {
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
			(item.name === type) && findNotes(key, item.intervals)
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
		
		let [E, A, D, G, H, E2] = [P0, Q1, Q1 + Q1, Q1 + Q1 + Q1, Q1 + Q1 + Q1 + T4, O + O];
		
		const Guitar = (note) => {
			let guitarOctave = O * 4;
			let index = note + guitarOctave;
			return {
				key: this.state.Notes[index],
				index
			}
		};
		
		const CurrString = (note) => {
			return this.state.Notes.slice(note.index, note.index + O * 1.5)
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
		
		const ButtonsyKeys = () =>
			this.state.mask.map((key, i) => {
				let bgcolor = key === this.state.currKey ? '#CCC' : '#AAA';
				return <button key={`${i}+1`} onClick={() => this.changeKey(key)}
							   style={{ backgroundColor: bgcolor }}>{key}</button>
			});
		
		
		return (
			<div className='guitar'>
				<h1>Guitar</h1>
				<div className="info">
					<div className="key">{this.state.currKey} </div>
					<div className="type">{this.state.currType}</div>
					<div className='buttons'>
						<ButtonsType/>
						<hr/>
						<ButtonsyKeys/>
					</div>
				</div>
				
				<div className='StringRow'>
					{
						[Guitar(E2), Guitar(H), Guitar(G), Guitar(D), Guitar(A), Guitar(E)]
							.map((note, i) =>
								<ul key={i} className='StringRow_list'>
									{
										CurrString(note)
									}
								</ul>
							)
					}
				</div>
			</div>
		)
	}
}

