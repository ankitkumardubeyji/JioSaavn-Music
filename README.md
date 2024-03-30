# The error message "invalid signature"
This often occurs when using JSON Web Tokens (JWTs) in web applications. I addressed the issue by updating 
the custom method in the user model for creating the jwt token in jwt.sign, by updating the access_token_secret i had passed 
for creating the token

