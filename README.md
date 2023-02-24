# H2 Tanken

This tiny app shows info in a responsive way about the Dutch H2 stations. It uses the data provided by [h2.live](https://h2.live). 

[![Netlify Status](https://api.netlify.com/api/v1/badges/24a6abe8-aee5-4487-8bc4-600e82e335be/deploy-status)](https://app.netlify.com/sites/h2stations/deploys)

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://cli.emberjs.com/release/)

## Installation

* `git clone <repository-url>` this repository
* `cd h2stations`
* `npm install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Running Tests

* `ember test`
* `ember test --server`

### Linting

* `npm run lint`
* `npm run lint:fix`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Netlify

The deploy will happen from the `main` branch directly thanks to Netlify. The data that is used for this app comes from a `Netlify function` that you can run be doing `netlify functions:serve` if you've installed `netlify-cli`.
