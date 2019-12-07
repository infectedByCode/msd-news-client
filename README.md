# NEWS SITE

A reddit-style news site for creating and sharing articles on various topics. Users are able to create, comment and delete articles, create and delete comments as well as upvote comments and articles written by other users.

This frontend [React](https://reactjs.org/) App works with a backend API created with NodeJS and Express.

The API for this project can be seen [here](https://msd-news.herokuapp.com/api) and the GitHub repository can be [found here]('https://github.com/infectedByCode/news-site').

Before cloning, you may with to visit the demo for the app [here](https://newsbits.netlify.com/).

## Getting Started

---

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

A step by step guide to getting the project running on your local machine.

#### Prerequisites

In order to get the app running on your local machine, you will require the following installed.

- [NodeJS v.8.10](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

#### Cloning to local machine

1. Go to the root of the repository [here]('https://github.com/infectedByCode/msd-news-client').
2. Fork the repository to your GitHub account.
3. Once forked, you will be given a git link. Copy this link.
4. Open up a terminal on your local machine and type `git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY` and press _Enter_. Your local clone will then be created.

#### Installing packages

The following packages will be required to get the API working locally.

##### Production Packages

- @reach/router
- axios
- bootstrap
- cors
- react
- react-bootstrap
- react-dom
- react-scripts
- react-timestamp

To install all, type `npm install` and press _Enter_. The packages will be installed from the package.json.

## Available Scripts

Running the, you can run:

### `npm start`

This will run the app in development mode. Site will be available on localhost:/3000 in a browser.

### `npm run build`

Creates a production version on the app with all relevant files required.
