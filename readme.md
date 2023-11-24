# Welcome to Vending Machine, a simple implemantation of a vending machine

This is a fullstack tech challange for MVP match Nov 2023

# Infrastruture
The project is using docker containers orchastrated by docker compose for simple setup

setup should be as simple as running one command `docker-compose up`
- frontend -> react (http: http://localhost:3000)
    - tests
        - `npm run test:dev`
- backend -> Nodejs and Express -> (http://localhost:3001/)
    - tests
        - `npm run test:dev`
- database -> MongoDB (port 27017)
    - migrations
        - I will try if I have time to add some

- CI/CD -> github actions(https://github.com/blavejr/vendingMachine/actions)
    - Github actions
        - check if images can build
        - check if tests will pass in CI
        - might add uloading images to docker registry if there is time

# Postman
Postman collection is included in the backend as a json file that can be imported into postman
- `be/postman/vendingMachine.postman_collection.json`

### Testing
#### NB: Run login route first to setup env variables
- I have taken the time to write a simple postman script to automatically add the token on login to a variable which can be set globally in auth and have all other requests inherit from there

```
const response = pm.response.json();
const jwtToken = response.token;

pm.environment.set('jwtToken', jwtToken);
```

pre-script for adding some variables needed for the postman collection can also be put on the login route

```
pm.environment.set('be_Host', "http://localhost:3001");
pm.environment.set('fe_Host', "http://localhost:3000");
````

# Authentication
### Basic authentication
    - login
### JWT Bearer token authentication
    - All other routes except for registration
## Session management
- I have deployed a simple session management system, sessions are saved in the mongoDB as JS objects, sessions do not contain tokens but a have userID, device info and a sessionID if a token has an id that does not match even if its a valid token it will be rejected, if the id is in one of the session objects in the db but its the device info does not match it will be rejected or it should behave like this if I have time to implement it

# Error Handling
Erros are handled via a global middleware, it will pick up all errors, sync and aysinc and it will respond with an appropriate response, so developers can freely throw errors and rely on the middleware to parse and return an appropriate response.

# Deliverables

### User Model and Authentication:
1. Implement user model with username, password, deposit and role fields.
2. Implement an authentication method (basic, oAuth, JWT or something else, the choice is yours).
3. All of the endpoints should be authenticated unless stated otherwise.
4. Implement CRUD for users (POST /user should not require authentication to allow new user registration).

### Product Model:
5. Implement product model with amountAvailable, cost, productName and sellerId fields.
6. Implement CRUD for a product model (GET can be called by anyone, while POST, PUT and DELETE can be called only by the seller user who created the product).

### Vending Machine Interaction:
7. Implement /deposit endpoint so users with a “buyer” role can deposit only 5, 10, 20, 50 and 100 cent coins into their vending machine account.
8. Implement /buy endpoint (accepts productId, amount of products) so users with a “buyer” role can buy products with the money they’ve deposited. API should return total they’ve spent, products they’ve purchased and their change if there’s any (in an array of 5, 10, 20, 50 and 100 cent coins).
9. Implement /reset endpoint so users with a “buyer” role can reset their deposit back to 0.

### Web Interface:
10. Create web interface for interaction with the API, design choices are left to you.

### Considerations:
11. Take time to think about possible edge cases and access issues that should be solved.
