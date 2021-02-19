import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Card, CardDeck, Container, Spinner, Alert } from 'react-bootstrap'
import Moment from 'react-moment'
function Restaurant({ id }) {
	let grades
	const [restaurant, setRestaurant] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		console.log('inside useEffect')
		return fetch(
			`https://web422restaurantapi.herokuapp.com/api/restaurants/${id}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log('log ok')
				setLoading(false)
				if (data.hasOwnProperty('_id')) {
					setRestaurant(data)
				} else {
					setRestaurant(null)
				}
			})
			.catch((err) => console.warn(err))
	}, [id])

	if (loading) {
		return (
			<Container>
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading Restaurant</span>
				</Spinner>
			</Container>
		)
	} else if (!restaurant) {
		return (
			<Container>
				<Alert variant="dark">No Restaurants Found</Alert>
			</Container>
		)
	} else {
		grades = restaurant.grades
	}

	return (
		<div>
			<Card>
				<Card.Header
					className="font-weight-bold"
					style={{ fontSize: '1.5rem' }}
				>
					{restaurant.name}
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{restaurant.address.building} {restaurant.address.street}
					</Card.Text>
					<MapContainer
						style={{ height: '400px' }}
						center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
						zoom={13}
						scrollWheelZoom={false}
					>
						<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
						<Marker
							position={[
								restaurant.address.coord[1],
								restaurant.address.coord[0]
							]}
						></Marker>
					</MapContainer>
				</Card.Body>
			</Card>
			<hr />
			<h2>Ratings</h2>
			<CardDeck style={{ rowGap: '2rem', justifyContent: 'space-between' }}>
				{grades.map((g, index) => (
					<Card
						key={index}
						style={{
							flex: 'none',
							width: '250px'
						}}
					>
						<Card.Header style={{ fontWeight: 'bolder' }}>
							Grade: {g.grade}
						</Card.Header>
						<Card.Body>
							<Card.Text>
								Completed: <Moment format="MM/DD/YYYY">{g.date}</Moment>
							</Card.Text>
						</Card.Body>
					</Card>
				))}
			</CardDeck>
		</div>
	)
}

export default Restaurant
