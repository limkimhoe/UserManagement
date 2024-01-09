const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {

    let token = req.headers['authorization']?.split(' ')[1]; // Get the token from the header
    if(!token){
      if(!req.cookies.jwt){
        return res.sendStatus(401); // No token, unauthorized
      }else{
        token = req.cookies.jwt;
      }
      
    }
    console.log(token);
    //console.log(req.headers['authorization'])
    // if (!token) {
    //   return res.sendStatus(401); // No token, unauthorized
    // }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(`User: ${JSON.stringify(user)}`);
        if (err) {
          return res.sendStatus(403); // Token is invalid
        }

        const userData = {
          user_id: user.user_id,
          username: user.username,
          role_name: user.role_name,
          role_id: user.role_id
        }

        // req.body.id = user.user_id;
        // req.body.role = user.role_name;
        // req.body.role_id = user.role_id;
        // req.body.username = user.username;

        req.user = userData; // Populate req.user with the decoded token payload

        console.log(req.user);

        
        next();
    });
};

module.exports = authenticateToken;