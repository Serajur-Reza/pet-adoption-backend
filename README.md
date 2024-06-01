# Pet Adoption System (Backend)

This is a platform where users can authenticate themselves and find a pet for adoption.


Techonologies used - Node.js, Express.js, TypeScript, Prisma, Postgresql


How to run this locally,

    1. Go to the project folder
    2. Run this command - npm install
    3. And then - npm run dev



## API Reference

### Authentication

#### Login User

```http
  POST https://assignment-8-gray-xi.vercel.app/api/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |


#### Change Password

```http
  POST https://assignment-8-gray-xi.vercel.app/api/login
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `oldPassword` | `string` | **Required** |
| `newPassword` | `string` | **Required** |


### User


#### Register User

```http
  POST https://assignment-8-gray-xi.vercel.app/api/user
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `username` | `string` | **Required** |
| `email` | `string` | **Required** |
| `password` | `string` | **Required** |
| `role` | `string` | **Required** |
| `contactNumber` | `string` | **Optional** |
| `isActivated` | `string` | **Optional** |



#### Get User Profile

```http
  GET https://assignment-8-gray-xi.vercel.app/api/user/my
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |



#### Update User Profile

```http
  PATCH https://assignment-8-gray-xi.vercel.app/api/user/:id
```



| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Optional** |
| `email` | `string` | **Optional** |


### Pets

#### Get Paginated and Filtered Pets

```http
  GET https://assignment-8-gray-xi.vercel.app/api/pets
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional** |
| `species` | `string` | **Optional** |
| `breed` | `string` | **Optional** |
| `age` | `number` | **Optional** |
| `size` | `string` | **Optional** |
| `location` | `string` | **Optional** |
| `searchTerm(species, breed, location)` | `string` | **Optional** |
| `page` | `number` | **Optional** |
| `limit` | `number` | **Optional** |
| `sortBy` | `string(asc/desc)` | **Optional** |
| `sortOrder` | `string(asc/desc)` | **Optional** |

#### Create Pet

```http
  POST https://assignment-8-gray-xi.vercel.app/api/pets
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required** |
| `species` | `string` | **Required** |
| `breed` | `string` | **Required** |
| `age` | `number` | **Required** |
| `size` | `string` | **Required** |
| `location` | `string` | **Required** |
| `description` | `string` | **Required** |
| `temperament` | `string` | **Required** |
| `medicalHistory` | `string` | **Required** |
| `adoptionRequirements` | `string` | **Required** |



#### Update Pet

```http
  PUT https://assignment-8-gray-xi.vercel.app/api/pets/:petId
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |


| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Optional** |
| `species` | `string` | **Optional** |
| `breed` | `string` | **Optional** |
| `age` | `number` | **Optional** |
| `size` | `string` | **Optional** |
| `location` | `string` | **Optional** |
| `description` | `string` | **Optional** |
| `temperament` | `string` | **Optional** |
| `medicalHistory` | `string` | **Optional** |
| `adoptionRequirements` | `string` | **Optional** |


### Adoption

#### Get Adoption Request

```http
  GET https://assignment-8-gray-xi.vercel.app/api/adoption/
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |


#### Get My Adoption Request

```http
  GET https://assignment-8-gray-xi.vercel.app/api/adoption/my-adoptions
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |

#### Create Adoption Request

```http
  POST /api/pets
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `petId` | `string` | **Required** |
| `petOwnershipExperience` | `string` | **Required** |





#### Update Adoption Request Status

```http
  PUT https://assignment-8-gray-xi.vercel.app/api/adoption/:requestId
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Authorization`      | `JWT` | **Required** |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `status` | `string` | **Required** |
