import React from 'react'
import { Card } from 'react-bootstrap'
function About() {
	const dateToFormat = '1976-04-19T12:59-0500'

	return (
		<div>
			<Card>
				<Card.Body>
					<Card.Title>About</Card.Title>
					<Card.Text>All about me - the developer.</Card.Text>
				</Card.Body>
			</Card>
		</div>
	)
}

export default About
