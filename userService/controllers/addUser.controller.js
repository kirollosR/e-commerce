const Repository = require('../repositories/user.repository');

const repository = new Repository();

addUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        });
    }

    repository.addUser(body, res);
    // console.log(user);

    

    
}

module.exports = addUser;