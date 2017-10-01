# Alpaca
[![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)

## Alpaca - A Simple Shipping Solution ##
We’ve been working to develop a totally new type of simple shipping solution. We call it Alpaca!

Ever rushed home for a delivery, only to find it delayed?  Ever worried about a gift not arriving in time for the holidays? What if you could see all your orders across the web in one easy resource. That’s why we built Alpaca.

Alpaca automatically stores your package details for all your orders across on the web.

Whatever you buy, we'll find and import your shipping details for you, integrated seamlessly into a Google Chrome extension. 

![Gif](LINK) 

Alpaca connects directly to major shipping carriers to display your order status in real time on your user dashboard.

Alpaca will be available soon. 

Happy pac'in!

Team Alpaca

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Scaffolding](#scaffolding)
    1. [Build](#build)
    1. [Production](#production)
    1. [Tests](#tests)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Help](#help)

## Usage ##
### How to Get Started On Heroku
![Preview](LINK) 
In the browser, navigate to localhost:4200. From home, login (or sign up) through to proceed to your user dashboard. Feel free to add an order, or view your most recent orders. 

### How to Get Started On Local Host
1. Install 
2. Connect to your a Firebase account.
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm i`

## Requirements ##
This project uses:
* [**F**irebase](http://www.firebase.com) ([Firebase](https://www.firebase.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 4](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

Other tools and technologies used:
* [Angular CLI](https://cli.angular.io): frontend scaffolding
* [Bootstrap](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons
* [TypeScript](https://www.typescriptlang.org): typed superset of JavaScript

## Development ##
`npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute Firebase, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

### Scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build

### Production
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) . 
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Tests
### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Team
  - __Product Owner__: [Nadina Gerlach](https://github.com/nadinagerlach)
  - __Scrum Master__: [David Kang](https://github.com/davidxkang)
  - __Development Team Members__: [Gabriel Katz](https://github.com/gabekatz), [Dan Kim](https://github.com/dankim9)

## Contributing

See [CONTRIBUTING.md](https://github.com/unexpected-lion/ourglass/blob/master/contributing.md) for contribution guidelines.

## Help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
