import { useState, useEffect } from 'react'
import queryString from 'query-string'
import {
	Card,
	Table,
	Pagination,
	Container,
	Spinner,
	Alert
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

function Restaurants(props) {
	const history = useHistory()
	const perPage = 10
	const [restaurants, setRestaurants] = useState(null)
	const [page, setPage] = useState(1)
	let { borough } = props.query ? queryString.parse(props.query) : ''

	if (borough === undefined) borough = ''

	useEffect(() => {
		return fetch(
			`https://web422restaurantapi.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${borough}`
		)
			.then((res) => res.json())
			.then((result) => {
				setRestaurants(_.orderBy(result, ['borough,cuisine']))
			})
			.catch((err) => console.warn(err))
	}, [page, borough])

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1)
		}
	}

	const nextPage = () => {
		setPage(page + 1)
	}

	if (!restaurants) {
		return (
			<Container>
				<Spinner animation="border" role="status">
					<span className="sr-only">Loading Restaurant</span>
				</Spinner>
			</Container>
		)
	}

	if (restaurants.length === 0) {
		return (
			<Container>
				<Alert variant="dark">No Restaurants Found</Alert>
			</Container>
		)
	}

	return (
		<Card>
			<Card.Header className="font-weight-bold" style={{ fontSize: '1.5rem' }}>
				Restaurant List
			</Card.Header>
			<Card.Body>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Name</th>
							<th>Address</th>
							<th>Borough</th>
							<th>Cuisine</th>
						</tr>
					</thead>
					<tbody>
						{restaurants.map((restaurant) => (
							<tr
								onClick={() => {
									history.push(`/restaurant/${restaurant._id}`)
								}}
								key={restaurant._id}
							>
								<td>{restaurant.name}</td>
								<td>
									{restaurant.address.building} {restaurant.address.street}
								</td>
								<td>{restaurant.borough}</td>
								<td>{restaurant.cuisine}</td>
							</tr>
						))}
					</tbody>
				</Table>
				<Pagination>
					<Pagination.Prev onClick={previousPage} />
					<Pagination.Item>{page}</Pagination.Item>
					<Pagination.Next onClick={nextPage} />
				</Pagination>
			</Card.Body>
		</Card>
	)
}

export default Restaurants
