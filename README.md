```js
db.books.insertMany([
  {
    title: "Dream Town",
    description:
      "Archer, Dash and Callahan search for a missing screenwriter who had a dead body turn up in her home.",
    authors: "David Baldacci",
  },
  {
    title: "Beautiful",
    description:
      "A supermodel deals with the effects of a terror attack at an airport in Brussels on her life and appearance.",
    authors: "Danielle Steel",
  },
]);
```

```js
db.books.find({ title: { $regex: ".*text.*", $options: "i" } });
```

```js
db.books.updateOne(
  { _id: "ObjectId(...)" },
  {
    $set: {
      description:
        "A battered wife raised in a violent home attempts to halt the cycle of abuse.",
      authors: "Colleen Hoover",
    },
  }
);
```
