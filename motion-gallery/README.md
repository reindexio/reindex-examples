# motion-gallery

Instagram clone with Motion, Relay and Reindex.

Fork and clone the repository.

Install Motion and Reindex

```
npm install -g motion reindex-cli
```

Set `REINDEX_URL` env variable to be your be your Reindex app url. Set
`REINDEX_TOKEN` to be your Reindex admin token.

```
export REINDEX_URL="https://YOUR-REINDEX-APP.myreindex.com"
export REINDEX_TOKEN="YOUR-REINDEX-TOKEN"
```

Create file `Config.js`

```
const Config = {
  REINDEX_URL: 'https://YOUR-REINDEX-APP.myreindex.com',
  UPLOADCARE_PUBLIC_KEY: 'YOUR_UPLOADCARE_PUBLIC_KEY'
}

export default Config;
```

Push Reindex schema in ReindexSchema.json.
Also fetch Relay schema (saved as ./.flint/RelaySchema.json).

```
bin/reindex schema-push
bin/schema-relay
```

Run and open on localhost:3000

```
motion
```


Play with GraphiQL

```
reindex graphiql
```

Note that authentication will work only once you enable authentication providers
inside your Reindex console.
