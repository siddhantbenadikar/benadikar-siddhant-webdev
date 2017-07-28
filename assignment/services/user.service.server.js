module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];

    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;
        newUser._id = (new Date()).getTime() + "";
        users.push(newUser);
        res.json(newUser);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        for (var u in users) {
            if (users[u]._id === userId) {
                users[u] = newUser;
                res.json(users[u]);
                return;
            }
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id === userId) {
                res.json(users[u]);
            }
        }
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            for (var u in users) {
                var _user = users[u];
                if (_user.username === username && _user.password === password) {
                    res.json(_user);
                    return;
                }
            }
        } else if (username) {
            for (var u in users) {
                if (users[u].username === username) {
                    res.json(users[u]);
                    return;
                }
            }
        }
        res.send("0");
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        for (var u in users) {
            if (users[u]._id === userId) {
                users.splice(u, 1);
                return;
            }
        }
    }
};