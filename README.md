## Description

A simple app that allows fetching of users and products.
Note: used `nest-cli` to generate the bootstrap code.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
```
Navigate to `localhost:3000/graphql` to use the app.

## Test

```bash
# unit tests
$ npm run test
```

## Documentation
You can refer to the file `graphql_queries.md` for example queries/mutations to perform inside of graphql playground.

### API 
#### Queries
##### Users
```
// Fetches all users
getUsers(): User[]

// Fetches a single user by the user ID
getUser(id: Int): User
```

##### Products
```
// Fetches all products
getProducts(): Product[]

// Fetches a single product by the product ID
getProduct(id: Int): Product
```

#### Mutations
##### Users
```
// Creates a user 
createUser(createUserInput: { name, email, age }): User

// Updates a user with the provided user ID 
updateUser(updateUserInput: { id, name?, email?, age? }): User

// Removes a user by the user ID
removeUser(id): String

// Adds product(s) to a user's order list
addProductsToUserOrder(id, order: [ productIds ]): User
```

##### Products
```
// creates a single product
createProduct(createProductInput: name, price): Product

// creates multiple products
createMultipleProducts( createProductInput[] ): Product[]

// updates a product by product ID
updateProduct(id): Product

// removes a product by product ID
removeProduct(id): String
```


### SCHEMA

```
type Product {
  id: Int!
  name: String!
  price: Float!
}

type User {
  id: Int!
  name: String!
  email: String!
  age: Int!
  order: [Product!]!
}

type Query {
  getUsers: [User!]!
  getUser(id: Int!): User!
  getProducts: [Product!]!
  getProduct(id: Int!): Product!
}

type Mutation {
  createUser(createUserInput: CreateUserInput!): User!
  updateUser(updateUserInput: UpdateUserInput!): User!
  removeUser(id: Int!): String!
  addProductsToUserOrder(
    addProductsToUserOrderInput: AddProductsToUserOrderInput!
  ): User!
  createProduct(createProductInput: CreateProductInput!): Product!
  createMultipleProducts(bulkInput: [CreateProductInput!]!): [Product!]!
  updateProduct(updateProductInput: UpdateProductInput!): Product!
  removeProduct(id: Int!): String!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int!
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
  id: Float!
}

input AddProductsToUserOrderInput {
  id: ID!
  order: [ID!]!
}

input CreateProductInput {
  name: String!
  price: Float!
}

input UpdateProductInput {
  name: String
  price: Float
  id: Float!
}

```


## Credits (from nest team)
### Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

### Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

### License

Nest is [MIT licensed](LICENSE).
