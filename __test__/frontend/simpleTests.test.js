
/*
unit testing - testing a small part of code
integration testing - multiple units working together
end to end - testing from front to backend
*/

// possible tests we can implement:

// -and onclick or onchange events including toggling the sidebar or navbar
//data fetching 

import { render, screen } from '@testing-library/react'
import { NavBar } from '../../src/components/NavBar.jsx'
import React from 'react'
import  { Dashboard } from '../../src/components/Dashboard.jsx'
import { Provider } from 'react-redux';
import { Insights } from '../../src/pages/Insights.jsx'




	it("renders navbar", () => {

		const navBar = render(<NavBar />)
		expect(navBar).toBeTruthy()

	});

	it("renders a button named Dashboard on the navbar", () => {

		const { getByTestId } = render(<NavBar />)
		expect(getByTestId("dashBtnNavBar").textContent).toBe("Dashboard")
	});


	it("has a button named github", () => {
		render(<Insights/>)
		const githubButton = screen.getByRole('button', {name: /Github/i})
		expect(githubButton).toBeInTheDocument()
	})



