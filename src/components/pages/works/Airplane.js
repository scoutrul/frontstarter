import React, { Component } from 'react'
import './airplane.scss'

const api =
	{
		"airplane": "A320",
		"seats": [
			{
				"number": "1A",
				"free": true
			},
			{
				"number": "1C",
				"free": true
			},
			{
				"number": "2A",
				"free": true
			},
			{
				"number": "2C",
				"free": true
			},
			{
				"number": "2D",
				"free": true
			},
			{
				"number": "2F",
				"free": true
			},
			{
				"number": "3A",
				"free": true
			},
			{
				"number": "3C",
				"free": true
			},
			{
				"number": "3D",
				"free": true
			},
			{
				"number": "3F",
				"free": true
			},
			{
				"number": "4A",
				"free": true
			},
			{
				"number": "4B",
				"free": true
			},
			{
				"number": "4C",
				"free": true
			},
			{
				"number": "4D",
				"free": true
			},
			{
				"number": "4E",
				"free": true
			},
			{
				"number": "4F",
				"free": true
			},
			{
				"number": "29A",
				"free": true
			},
			{
				"number": "29B",
				"free": true
			},
			{
				"number": "29C",
				"free": true
			},
			{
				"number": "29D",
				"free": true
			},
			{
				"number": "29E",
				"free": true
			},
			{
				"number": "29F",
				"free": true
			}
		]
	}


export default class extends Component {
	
	state = {
		seats: [],
		cols: ['A', 'B', 'C', 'D', 'E', 'F'],
		rows: 29,
		filteredSeats: [],
		notLuckyNumber: 13,
		selectedNumber: 'Не выбран номер'
	};
	
	componentWillMount() {
		
		const GenerateSeats = (cols, rows) => {
			
			//generate all seats
			let SeatsMap = new Map()
			
			for (let i = rows; i >= 1; i--) {
				cols.forEach(col => {
					return (i !== this.state.notLuckyNumber) &&
						SeatsMap.set(`${i}${col}`, { free: false })
				})
			}
			
			//concat all seats with api data
			api.seats.forEach(seat => SeatsMap.set(seat.number, { free: seat.free }))
			
			//make new object seats data
			let seats = [];
			for (let [key, value] of SeatsMap) {
				seats = [...seats, {
					number: key, free: value.free
				}]
			}
			
			
			let filteredSeats = cols.map(col => {
				return seats.filter(seat => seat.number.indexOf(col) !== -1).reverse()
			})
			
			this.setState({ seats, filteredSeats })
		}
		
		GenerateSeats(this.state.cols, this.state.rows);
		
	}
	
	onSelect = (number) => {
		this.setState({ selectedNumber: number })
	}
	
	render() {
		const RenderSeats = () => {
			let some = this.state.filteredSeats.map((x, i) =>
				<ul key={i}>
					{
						x.map((seat, i) =>
							<li key={seat.number}
								onClick={() => this.onSelect(seat.number)}>{seat.number}</li>)}
				</ul>
			)
			return some
		}
		
		return (
			<section>
				<div className='contentView plane'>
					
					<h1>Airplane seats </h1>
					
					<div className="container">
						<div className="planeview">
							<div className="seats">
								{RenderSeats()}
							</div>
							<div className="image">
								<img
									src="https://user-images.githubusercontent.com/35366061/34867937-1717d17c-f793-11e7-897f-ca1fd886b913.jpg"
									alt=""/>
							</div>
						</div>
						
						<div className="goal">
							<div>"Необходимо реализовать карту самолета с отображением свободных мест и возможностью
								их
								выбора
								клику для карты самолета"
							</div>
							
							<div className="result">
								<div className="selectedNumber">{this.state.selectedNumber}</div>
							</div>
						</div>
					</div>
				
				</div>
			</section>
		)
	}
}

