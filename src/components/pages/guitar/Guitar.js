import React from 'react'
import './guitar.scss'

export class Guitar extends React.Component {
	state = {
		showChord: [],
		currKey: 'A',
		currType: 'Major',
		intervalSet: [],
		Notes: [],
		mask: [],
		types: [],
		Octaves: [],
	};
	
	componentDidMount() {
		// this.setState({ currKey: this.state.mask[0], currType: this.state.types[0] });
		this.changeChord()
	}
	
	componentWillMount() {
		let mask = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H', 'C', 'C#', 'D', 'D#'];
		let Octaves = [[...mask], [...mask], [...mask], [...mask], [...mask], [...mask], [...mask], [...mask], [...mask]];
		let Notes = [];
		for (let item of new Set(Octaves).keys()) {
			Notes = [...Notes, ...item]
		}
		const [P0, S1, S2, T3, T4, Q1, Q2, QE1, QE2, SX1, SX2, SE1, SE2, O] = [0, 1, 2, 3, 4, 5, 6, 6, 7, 8, 9, 10, 11, 12];
		let intervalSet = new Set([{
			P0,
			S1,
			S2,
			T3,
			T4,
			Q1,
			Q2,
			QE1,
			QE2,
			SX1,
			SX2,
			SE1,
			SE2,
			O
		}]).values().next().value;
		
		this.setState({
			intervalSet,
			Notes,
			mask,
			Octaves,
			types: [
				{
					name: 'Major',
					intervals: [P0, T4, QE2]
				},
				{
					name: 'Minor',
					intervals: [P0, T3, QE2]
				},
				{
					name: 'Sept',
					intervals: [P0, T4, QE2, SE1]
				}],
			
		})
	}
	
	changeChord = () => {
		const [key, type] = [this.state.currKey, this.state.currType];
		const doubleOctave = [...this.state.mask, ...this.state.mask];
		
		const findNotes = (key, type) => {
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
	
	changeKey = (key) => {
		this.setState({ currKey: key }, () => this.changeChord())
	};
	changeType = (type) => {
		this.setState({ currType: type }, () => this.changeChord())
	};
	
	render() {
		let { P0, T4, Q1, Q2, O } = this.state.intervalSet;
		
		let [E, A, D, G, H, E2] = [P0, Q1, Q1 + Q1, Q1 + Q1 + Q1, Q1 + Q1 + Q1 + T4, O + O];
		
		const Guitar = (note) => {
			let guitarOctave = O * 4;
			let index = note + guitarOctave;
			return {
				key: this.state.Notes[index],
				index
			}
		};
		
		const currString = (note) => {
			return this.state.Notes.slice(note.index, note.index + O * 1.5)
				.map(item =>
					<li key={`${++note.index}${item}`}>
						{
							this.state.showChord.includes(item) ?
								<span className='active'>{item}</span> :
								<span>{item}</span>
							
						}
					</li>
				)
		};
		
		return (
			<div className='guitar'>
				<h1>Guitar</h1>
				<h2>
					Key: {this.state.currKey} <br/>
					Type: {this.state.currType}<br/>
					Chord: {this.state.showChord.toString()}
				</h2>

				<div className='StringRow'>
					{
						[Guitar(E2), Guitar(H), Guitar(G), Guitar(D), Guitar(A), Guitar(E)]
							.map((note, i) =>
								<ul key={i} className='StringRow_list'>
									{
										currString(note)
									}
								</ul>
							)
					}
				</div>
				
				{this.state.types.map((item, i) => {
					return <button key={`${item.name}+1`}
								   onClick={() => this.changeType(item.name)}>{item.name}</button>
				})}
				<hr/>
				{this.state.mask.map((item, i) => {
					return <button key={`${i}+1`} onClick={() => this.changeKey(item)}>{item}</button>
				})}
			
			</div>
		)
	}
}

