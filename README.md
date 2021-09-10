![dribblrLogo.png](./dribblrLogo.png)

<center>
A one-stop web application for managing basketball teams, leagues, fixtures and more!
</center>

## Getting Started (Development)

1. Install packages:

```
yarn && yarn --cwd client && yarn --cwd server
```

2. Add environment variables to `server/.env`:

```
echo JWT_SECRET=aaaaa >> server/.env
```

3. Start MongoDB locally ([install MongoDB](https://docs.mongodb.com/manual/installation/) if you haven't already).

4. Start the client development and backend development servers:

```
yarn dev
```

The frontend can be reached at http://localhost:3000/ and the backend will be at http://localhost:4000/. Swagger documentation can be viewed at http://localhost:4000/docs.

## Running Tests

After installing packages, run `yarn test` from the root directory to run both client and server tests.

## Contributing

1. Create a new branch (choose a group out of `feature/`, `chore/`, `refactor/`):

```
git checkout -b feature/myfeature
```

2. Add and commit your changes.

3. Run the linter:

```
yarn precommit
```

4. Push changes to remote:

```
git push origin feature/myfeature
```

