# Node Challenge

Take home test for Node.js developers.

## The challenge

This challenge has been designed to measure your knowledge of Node.js, Express, Typescript and various technologies, like monorepos, databases and testing. For your exercise, you will be enhancing this API which serves as the backend for the Pleo app. Whenever a user of the app navigates to the expenses view, it calls this API to collect the list of expenses for that user.

Your objective is to write this new route to fetch the list of expenses for a given user. Right now that domain is empty, so you'll have to build everything from scratch- but you can look over at the user domain for inspiration. Please make sure that the endpoint scales adequately and supports paging, sorting and filtering. Additionally, we would also like you to write some tests for your route.

Finally, as a bonus objective, try to improve any aspect of this API. It could be to add more TS types, better security, tests, add features, graphql support, etc. 

## Instructions

Fork this repo with your solution. Ideally, we'd like to see your progression through commits, and don't forget to update the README.md to explain your thought process.

Please let us know how long the challenge takes you. We're not looking for how speedy or lengthy you are. It's just really to give us a clearer idea of what you've produced in the time you decided to take. Feel free to go as big or as small as you want.

## Install

Make sure that you have a modern version of `yarn` that supports workspaces (`>= 1.0`), then run:

```bash
yarn
```

You will also need to [install Postgres](https://www.postgresqltutorial.com/install-postgresql-macos/), create a `challenge` database and load the sql file `dump.sql`:

```bash
psql challenge < dump.sql
```

## Start

To enable logs, use the standard `NODE_DEBUG` flag with the value `DEBUG`

```bash
NODE_DEBUG=DEBUG yarn start
```

## Test

Make sure that you have a modern version of `yarn` that supports workspaces, then run:

```bash
yarn test
```

The command above will run the following test suites sequentially:

| Test suite | Run command | Description |
-------------|-------------|-------------|
| Unit | `yarn test:unit` | Simple unit tests. |
| Mid-level | `yarn test:mid-level` | Small integration tests that integration of small components together.  |
| Acceptances | `yarn test:acceptance` | Large integration tests, system tests, end-to-end tests. |


Happy hacking 😁!


## Thought Process
1. fixed some files causing error when running yarn test / yarn test:acceptance
2. added new route for endpoint GET /expense/v1/get-user-expenses
3. added db model to make the endpoint works without pagination first
4. added paging, sorting and exact value filtering
5. added test case for formatter and db helper functions
6. add validation for query params
7. added range filtering for amount_in_cents, modify unit tests
8. added documentation and sample request

## Documentation
GET /expense/v1/get-user-expenses

| Query Param | Description                                                                                                                      |
-------------|----------------------------------------------------------------------------------------------------------------------------------|
| userId      | required                                                                                                                         |                                                             |
| limit   | limit items per page. Default 10                                                                                                 |
| page | page number. default 1                                                                                                           |
| sortBy   | the column to sort by (accept `'merchant_name', 'amount_in_cents', 'currency', 'date_created', 'status'`) default `date_created` |
| sortDirection | sort direction (accept `'ASC', 'DESC'`), default `DESC`                                                                          |
| merchantName | filter merchant_name which exact match                                                                                           |
| status | filter status which exact match                                                                                                  |
| currency | filter currency which exact match                                                                                                |
| amountInCents-min | filter amount_in_cents which larger than this number                                                                             |
| amountInCents-max | filter amount_in_cents which smaller than this number                                                                            |

sample
```bash
curl --location --request GET 'localhost:9001/expense/v1/get-user-expenses?userId=da140a29-ae80-4f0e-a62d-6c2d2bc8a474&merchantName=Sliders&status=processed&currency=DKK&amountInCents-min=1000&amountInCents-max=10000&sortBy=merchant_name&sortDirection=ASC&limit=2&page=1'
```
