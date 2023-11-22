Sure, let's organize these statements into different sections based on the part of the app they pertain to:

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

How does this look?