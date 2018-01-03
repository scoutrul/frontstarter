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
		
		return (
			<div className='guitar'>
				<h1>Guitar</h1>
				<div className="info">
					<div className="key">{this.state.currKey} </div>
					<div className="type">{this.state.currType}</div>
					<div className='buttons'>
						{this.state.types.map((type, i) => {
							let bgcolor = type.name === this.state.currType ? '#CCC' : '#AAA';
							return <button key={`${type.name}+1`}
										   onClick={() => this.changeType(type.name)}
										   style={{ backgroundColor: bgcolor }}>{type.name}</button>
						})}
						<hr/>
						{this.state.mask.map((key, i) => {
							let bgcolor = key === this.state.currKey ? '#CCC' : '#AAA';
							return <button key={`${i}+1`} onClick={() => this.changeKey(key)}
										   style={{ backgroundColor: bgcolor }}>{key}</button>
						})}
					</div>
				</div>
				
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
			</div>
		)
	}
}

