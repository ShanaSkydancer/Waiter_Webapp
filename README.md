# Waiter Webapp
---------------

### Table of Contents:
***
* [About the app](#about-app)
* [How to use the app](#how-to-use-the-app)
* [How to get the app](#how-to-get-the-app)
* [Installation Guide](#installation)
* [Mongo Database](#mongodb)
* [How to run tests](#runningtests)


## About app
***
The Waiter Webapp is perfect system for waiters and admin alike. Waiters log in and submit the days that they're working for the week. The admin can log in and access the waiters and which days they're working, and also rest the week's data to start again new for the waiters to submit their days.

## User Section
---------------

## How to use the app
***

The application is live on heroku here:
`https://codex-waiter-webapp.herokuapp.com/`

1. A user logs in as a waiter.
	* (Logging in as a waiter will take you to the waiter page, alternatevly, logging in as an admin will take you to an admin.)
	* Enter a username and password and click 'log in'.

2. Select the days that you'd like to work and click 'submit'.
	* As a waiter your job is done.

3. Log in as admin with the username "Admin" or "admin" and click 'log in'.
	* Now as an admin you want to access the days your staff is working.

4. As an admin you will not be taken to a screen to select days but rather an admin screen where you can view a table of week days and waiters working in those days.
	* The tables cell will turn red if there is more than 3 waiters working a day.
	* Green if there is just 3 waiters working (the perfect amount).
	* Stay white if there is less than 3 waiters working.
	* As an admin you can press the 'reset' button and remove all waiters working for that week, so that the waiters can submit new working days for the next week.

## Developers Section
---------------------

## How to get the app
***

### The following must be installed before any further steps
***

1. NPM
2. Node
3. Nodemon
4. Mocha
5. Travis CI
6. MongoDB

## Installation
***

1. Fork and clone the repository from Github

2. Go to the folder on your computer/laptop that you've just cloned and run `npm install`
	* This is going to download all the dependencies that you'll need because they were listed in the projects package.json file.

3. Now you can run 'npm nodemon' in the same folder. Using this to run your code and it will automatically restart when you make changes to your code.

## MongoDB
***

1. Run MongoDB with the command `mongodb`.

2. To check your database use `show db`.
	* You'll see the database that was set up for this app is 'waiter_webapps'.

3. Use the database by running `use waiter_webapps`.

4. Once you've switched to the 'water_webapps' database can view the collection inside it.
	* To view the collections go to `db.workingmodels.find({})`
	* This is now display all the waiters and their working days as different objects

5. To manually remove the collections from the 'waiter_webapps' database, using the terminal type in `db.workingmodels.remove({})`

## Running Tests
***

We will be running test with:
1. Mocha
2. Travis CI

### Mocha
***

To run mocha you simply use

`mocha`

### Travis CI
***

1. Log in to Travis CI with your Github account

2. Flick your repo's switch on
	* Go to your Profile page
	* Look at the organisations that you're a member of
	* Flip the switch in the repository that you'd like to enable

3. Add a `.travis.yml` file into your project folder

4. In that file add:

`language: node_js
node_js:
-"stable"
`

5. You will need to go into your package.json file and set up a test script

`"scripts": {
    "test": "node_modules/.bin/mocha"
  }`

6. Dont forget to push now to Github
	* Push your commit that adds .travis.yml to your repository

7. Now to run Travis you simply use

`npm test`

### Creator
-----------

Waiter Webapps was created by Charné Banger

[Github](https://github.com/ShanaSkydancer)

[Twitter](https://twitter.com/Shana_Skydancer)

[Stackoverflow](https://stackoverflow.com/users/7557788/shanaskydancer)
