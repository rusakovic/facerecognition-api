const handleSignin = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    // Validation of correct entering the credentials
    if (!email || !password) {
        return res.status(400).json('incorrect from submission')
    }
    // Take Email and Hash from Login table
    db.select('email', 'hash').from('login')
        // and compare email in Login table VS user entering  req.body.email
        .where('email', '=', email)
        // if we found the email we compare the hashes from the Login table and entered password
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            //if error with credentials
            else {
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('wrong credentials'))

}

module.exports = {
    handleSignin: handleSignin
}