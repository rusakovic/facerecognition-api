const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect from submission')
    }

    // Store hash in your password DB.
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
        //We should connect Users table and Login table by Email as Key
        db.transaction(trx => {
            // we tell what should be inserted...
            trx.insert({
                hash: hash,
                email: email
            })
            // ... into Login table
            .into('login')
            // ... and then we return the email from Login table for using into Users table
            .returning('email')
            // returnig email now loginEmil
            .then(loginEmail => {
                return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name: name,
                            joined: new Date()
                        })
                        .then(user => {
                            res.json(user[0]);
                    })

            })
            // To make changes into the tables we should Commit
            .then(trx.commit)
            // If some errors occur - catch them
            .catch(trx.rollback)
        })
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
}