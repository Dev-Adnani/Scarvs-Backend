
# Scarvs - A Shoe Ecommerce Backend

A Shoe Ecommerce Backend API , Made In Node.js With Help Of Typescript , Express , PostgresSQL [DB]


## Run Locally

Clone the project

```bash
  git clone https://github.com/Dev-Adnani/Scarvs-Backend
```

Go to the project directory

```bash
  cd Scarvs-Backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`JWT_SECRET`

`PORT`

`Host`

`DB_User`

`DB_Password`

`Database`

`DB_Port`

`DATABASE_URL`







## API Reference

#### Server Check

```http
  GET https://scarvs-backend.herokuapp.com
```

# Authentication

#### Signup

```http
  POST /auth/signup
```

| Parameter           | Type     | Description                             |
| :--------           | :------- | :--------------------------------       |
| `useremail`         | `string` | **Required**. User's Email              |
| `userpassword`      | `string` | **Required**. User's Password           |
| `username`          | `string` | **Required**. User's Username           |

#### Login

```http
  POST /auth/login
```

| Parameter           | Type     | Description                             |
| :--------           | :------- | :--------------------------------       |
| `useremail`         | `string` | **Required**. User's Email              |
| `userpassword`      | `string` | **Required**. User's Password           |

#### User Data Access

```http
  GET /auth/verify
```

| Headers             | Type     | Description                             |
| :--------           | :------- | :--------------------------------       |
| `Authorization`     | `string` | **Required**. JWT Token, Which You Get After Signup/Login            |


#### Login

```http
  POST /auth/change-password
```

| Parameter             | Type     | Description                                |
| :--------             | :------- | :--------------------------------          |
| `useremail`           | `string` | **Required**. User's Email                 |
| `oluserpassword`      | `string` | **Required**. User's Old Password          |
| `newuserpassword`     | `string` | **Required**. User's New Password          |



# User Info


#### Add User Info

```http
  POST /info/add-user-info
```

| Parameter             | Type     | Description                                |
| :--------             | :------- | :--------------------------------          |
| `useremail`           | `string` | **Required**. User's Email                 |
| `user_address`        | `string` | **Required**. User's Address               |
| `user_phone_no`       | `string` | **Required**. User's Phone No              |


#### Check User Info

```http
  GET /info/{useremail}
```

#### Check User Info

```http
  GET /auth/getUsers
```
| Headers             | Type     | Description                                             |
| :--------           | :------- | :--------------------------------                       |
| `Authorization`     | `string` | **Required**. JWT Token, Which You Get After Signup/Login            |


# Product 

#### Add Product

```http
  POST /product/add-products
```

| Parameter                   | Type     | Description                                |
| :--------                   | :------- | :--------------------------------          |
| `product_name`              | `string` | **Required**. Product Name                 |
| `product_description`       | `string` | **Required**. Product Description          |
| `product_price`             | `bigint` | **Required**. Product Price                |
| `product_category`          | `string` | **Required**. Product Category             |
| `product_image`             | `string` | **Required**. Product Image URL            |

#### Get All Products

```http
  GET /product
```

#### Get Specific Product 

```http
  GET /product/details/{$id}
```

#### Get Delete Product From DB

```http
  DEL /product/delete/{$id}
```
| Headers             | Type     | Description                                             |
| :--------           | :------- | :--------------------------------                       |
| `Authorization`     | `string` | **Required**. Secret Key                                |

#### Search Specific From Products

```http
  GET /product/search/{$product_name}
```

#### Get Products By Category 

```http
  GET /product/category/{$product_category}
```

# Cart 

#### Add To Cart For A Particular User

```http
  POST /cart/add-to-cart
```

| Parameter                   | Type     | Description                                |
| :--------                   | :------- | :--------------------------------          |
| `useremail`                 | `string` | **Required**. User's Email                 |
| `product_name`              | `string` | **Required**. Product Name                 |
| `product_price`             | `bigint` | **Required**. Product Price                |
| `product_category`          | `string` | **Required**. Product Category             |
| `product_image`             | `string` | **Required**. Product Image URL            |
| `product_size`              | `string` | **Required**. Shoes Size                   |

#### Check Cart For A Particular User

```http
  GET /cart/{$useremail}
```

#### Delete Cart Item For A Particular User

```http
  DEL /cart/{$id}
```
## Support

For support, email dev.adnani26@gmail.com

