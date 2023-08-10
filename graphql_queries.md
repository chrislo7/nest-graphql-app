### A (not full) list of graphQL queries/mutations examples to run in graphql playground
#### Users
```
{
  getUsers {
    id, name, email, age, order { id, name, price }
  } 
}

{
  getUser(id: $INT_INPUT) {
    id, name, email, age
  }
}

mutation {
  createUser(createUserInput: {
    name: $STRING_INPUT,
    email: $STRING_INPUT,
    age: $INT_INPUT,
  }) {
    id, 
    name,
    email,
    age
  }
}

mutation {
  updateUser(updateUserInput: {
    id: $INT_INPUT,
    name: $STRING_INPUT,
    email: $STRING_INPUT,
    age: $INT_INPUT,
  }) {
    id, 
    name,
    email,
    age
  }
}

mutation {
  removeUser(id: $INT_INPUT)
}

mutation {
  addProductsToUserOrder(addProductsToUserOrderInput: {
    id: $INT_INPUT, 
    order: [ $INT_ARRAY_INPUT ]
  }) {
    id,
    name,
    email,
    age,
    order { id, name, price }
  }
}
```

#### Products
```
{
  getProducts {
    id, name, price
  }
}

mutation {
  createProduct(createProductInput: {
    name: $STRING_INPUT,
    price: $INT_INPUT
  }) {
    id, 
    name,
    price
  }
}

mutation {
  removeProduct(id: $INT_INPUT)
}

mutation {
  createMultipleProducts(bulkInput: [
    { name: $STRING_INPUT, price: $INT_INPUT },
    { name: $STRING_INPUT, price: $INT_INPUT },
    ...more product information
  ]) {
    id, 
    name,
    price
  }
}

```