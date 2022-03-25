
/*
unit testing - testing a small part of code
integration testing - multiple units working together
end to end - testing from front to backend

possible tests we can implement:

-registration page does not let you submit until you fill all required inputs
-login page does not let you login unless you have correct username/password
-and onclick or onchange events including toggling the sidebar or navbar


*/
// import { FiberPinRounded } from "@mui/icons-material";
import { render, screen } from "@testing-library/react"
import Insights from "../../src/pages/Insights";

xtest('on initial render, the insights page should render the dashboard and change on user click', () => {
	render(< Insights />)
	console.log('in render')
	screen.debug();
})