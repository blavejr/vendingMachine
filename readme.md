# Welcome to Vending Machine, a simple implemantation of a vending machine

# Infrastruture
The project is using docker containers orchastrated by docker compose for simple setup

setup should be as simple as running one command `docker-compose up`
- frontend -> react (http: http://localhost:3000)
    - tests
        - `npm run test:dev`
- backend -> Nodejs and Express -> (http://localhost:3001/)
    - tests
        - `npm run test`
- database -> MongoDB (port 27017)
    - migrations
        - I will try if I have time to add some

- CI/CD
    - Github actions
        - check if images can build
        - check if tests will pass in CI
        - might add uloading images to docker registry if there is time

# Postman
Postman collection is included in the backend as a json file that can be imported into postman

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
