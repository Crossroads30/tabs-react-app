import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
	const [loading, setLoading] = useState(true)
	const [jobs, setJobs] = useState([])
	const [isError, setIsError] = useState(false)

	const fetchingData = async () => {
		try {
			const response = await fetch(url)
			if (!response.ok) {
				// case for 'fetch' to handle '400th' & '500th' errors!
				setIsError(true)
				setLoading(false)
				return
			}
			const jobs = await response.json()
			console.log(jobs)
			setLoading(false)
			setJobs(jobs)
		} catch (error) {
			console.log(error)
			setIsError(true)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchingData()
	}, [])

	if (loading) {
		return (
			<main>
				<section className='section'>
					<h3 className='loading'>Loading...</h3>
				</section>
			</main>
		)
	}
	if (isError) {
		return <h3>There was an error!</h3>
	}
  
	return (
		<main>
			<section className='section'></section>
		</main>
	)
}

export default App
