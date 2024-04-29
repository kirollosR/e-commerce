healthCheck = (req, res) => {
    res.status(200).json({
        StatusCode: 200,
        message: 'User Service is up and running'
    });
}

module.exports = healthCheck;