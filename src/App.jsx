import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'

const url = 'https://course-api.com/react-tabs-project'

function App() {
	const [loading, setLoading] = useState(true)
	const [isError, setIsError] = useState(false)
	const [jobs, setJobs] = useState([])
	const [value, setValue] = useState(0)

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
			setLoading(false)
			setJobs(jobs)
			// console.log(jobs)
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
	const { title, company, dates } = jobs[value]
	return (
		<main>
			<section className='section'>
				<div className='title'>
					<h2>Experience</h2>
					<div className='underline'></div>
				</div>
				<div className='jobs-center'>
					<div className='btn-container'>
						{jobs.map((job, index) => {
							return (
								<button
									onClick={() => setValue(index)}
									key={index}
									className={`job-btn ${index === value && 'active-btn'}`}
									type='button'
								>
									{job.company}
								</button>
							)
						})}
					</div>
					<article className='job-info'>
						<h3>{title}</h3>
						<h4>{company}</h4>
						<p className='job-date'>{dates}</p>
						{jobs[value].duties.map((duty, index) => {
							return (
								<div key={index} className='job-desc'>
									<FaAngleDoubleRight className='job-icon' />
									<p>{duty}</p>
								</div>
							)
						})}
					</article>
				</div>
				<button className='btn'>more info</button>
			</section>
		</main>
	)
}

export default App
