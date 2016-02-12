Welcome to your Flint folder!

Docs on Flint: https://flintjs.com/docs

This is the `.flint` folder. It's meant to stay out of your way, but it's not
off limits. The `.flint/.internal` folder is. If we're doing our jobs, you
should never need to touch it!

What's in here:

  - .internal/

  Flint uses this to run your app. Take a peek! If things are breaking badly,
  you can delete this folder to "reset" everything. Flint will still work.

  - static/

  Static is a bit odd. Ideally you put *everything* in your root folder
  (including assets), but we throw in a couple things here to keep them out of
  view. Namely, css. Basically, if you put it into your index.html directly
  (links or script), use the static folder. Flint automatically rewrites the
  URLs in index.html and copies the static stuff when you run `flint build`.

  - .gitignore

  Ensures you aren't committing internal stuff.

  - flint.json

  Config for Flint. Docs coming here: https://flintjs.com/docs/config

  - index.html

  This is your app index html file. Just don't remove the <!-- comments -->.
  You can drop in scripts or links if you need to here.

  - package.json

  Your npm packages. Flint writes to this as it manages your code. But you can
  still change it as you'd like.