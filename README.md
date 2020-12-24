# Dutch
>  **dutch** with each person paying his or her own way

A React Redux Based solution for the [assignment](https://github.com/vacuumlabs-interviews/3rd-round-Taha-Siddiqi/docs/Assignment.pdf). 

## Mission
To create a web application to help users to keep track of the payments for a **shared meal**. 

The application should enable a user to keep track of the payments that people owe him/her when the user pays for a **shared meal**. We are using the phrase **shared meal** for a meal where the one of the attendee pays the full bill and other attendees later pay their share to the payer. 

## Deployment
The application is deployed [here](https://laughing-dubinsky-6072c0.netlify.app)

## Usage
The application redirects a new user to the Welcome Page where the user entries his contact details (just name). Once the users contact is created, the user is taken to the application's home page. The user can perform the following operations

- Add a new contact.
- Delete an existing contact. *(only if the contact does not belong to any group)*
- Add a new group & add contacts as members to a group.
- Delete an existing group.
- Mark a member as paid. If all members have paid, the status of the group changes to archived.
- Unmark as member as paid. 
- Reset Storage.

## Implementation
The application is written in JavaScript and uses Redux/React tools. The application uses Testing Library  & Jest for writing tests.

### Libraries
The application is written in JavaScript using the following libraries :-

- [Redux Toolkit](https://redux-toolkit.js.org) :- For application state management.
- [React](https://reactjs.org) :- A reactive UI library.
- [React Router](https://reactrouter.com) :- A client routing library.
- [Testing Library](https://testing-library.com) :- UI testing library.
- [Connected React Router](https://github.com/supasate/connected-react-router) :- A react router integration library for redux.
- [Material-UI](https://material-ui.com) :- A Material Design library for React.

### Directory Layout
The application source is in the `src` directory and the tests are written in the embedded `__tests__` directories. The root level directories 

- `src/features` contains the application features namely `contacts` & `groups`.
- `src/components` contains components mainly concerned with the Layout.
- `src/app` contains the application store and root reducers.
- `src/utils` contains utilities.

### Application Documentation
The application documentation is stored in the docs folder.

### Application setup
Clone this repository and run `npm install`.

#### Development
To run the application in development mode, use the command.

	`npm run start`

#### Testing
To test the application, use the command

	`npm test -- --coverage`


There is an annoying warning `Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode.` which seems to be related to Material UI. We can disable to `Strict Mode` but that is too beneficial to be sacrificed for this warning.


#### Build
To build the application, use the command. 

	`npm run build`

### A word about the data schema
The application uses two main entities `contacts` and `groups` and both are implemented as `objects`. The preferred way should have been to use `Map` but because of the serialization and immutability problem. This problem can be solved by using libraries like `immutable.js`. The `membership` is maintained by the groups as a nested object. 


# What other things should have been part of this application

- Internationalization.
- Accessibility Check. Although `Material UI` takes care of most of the `aria` specifications but I didn't get enough time to check that.
- PWA :- This application is a good candidate for PWA.
- Settings :- User Settings for setting configuration like user's name, preferred currency etc.

