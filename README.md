# parkday-project

This is a demo for a dynamic webapp that displays the current orders for a customer's meal service. 

Some features:
- takes a user's service_id (as a URL parameter)
- shows only the meals with create_dates after the current time
- summarizes meal information
- includes a contact link for use if there are any issues with the order or delivery

The project is build entirely in React. To run the project locally:

- Clone the git repo
- Download and install Node.js
- Install necessary packages (`react`, `react-router-dom`, etc.)
- Use `npm start` to start the project in the browser
- To test URL parameters, after 'localhost:XXXX', type '/?serviceid=XX...XX'