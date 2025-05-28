# Explain and defend your implementation of HATEOAS in your solution.
HATEOAS is a great way for users to navigate and browse an API without having prior knowledge about the API. In my solution i have implemented links to endpoints depending on which resource is being accessed and by whom its being accessed by. Ive seperated the HATEOAS logic into a seperate service file for the link generation. This way I can easily manipulate which endpoint is getting which link. Since the API is tailored for a "Beehive Monitoring REST API" there is three different roles, a normal user, an admin and a farmer. Depending on their different access levels, different endpoints will provide different based on what the role is allowed to do.

# If your solution should implement multiple representations of the resources. How would you do it?
By using something called "content negotiation". This is when the client and server has to agree on which is the best format to exchange the data in. This can be achieved by an accept header being sent by the client in a header so the server knows which format to send the response in. 

# Motivate and defend your authentication solution.
JWT authentication is a common approach for authentication in modern web applications. Its popularized for offering a stateless way for authorization eliminating the need for sessions. This means that it doesnt have to rely on the server for sessions unlike other solutions

# 3a. What other authentication solutions could you implement?
There are several authentication solutions available and different solutions offers different pros and cons. Another solution can be Oauth 2.0.

# 3b. What are the pros/cons of this solution?
Oauth 2.0 is used a way for users to login using third-party services like google, facebook etc.

Advantages: 
- Delegates the authentication to the third-party through links, which means that you dont have to expose credidentials such as passwords or other sensitive login informations.
- Very scalable and widely used by popular platforms meaning its possibly more standardised and trustable. 
- Can be used for different scenarios like web applications, mobile services etc.

Disadvantages:
- It can be complex to implement if youre unfamiliar with the workflow.
- Relies heavily on the developer, poorly implemented oauth solutions such as setting wrong scopes, or bad storage of access tokens can be fatal.
- Relies on the third-party always being available.  

# Explain how your webhook works.
The webhook works by being able to register webhooks, where "subscribers" enters a URL and the events they interested in. When an event is fired the system sends all "subscribers" a JSON payload to their specified URL including information about the event, related data, and when it happened. 