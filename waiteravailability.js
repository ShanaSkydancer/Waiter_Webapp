module.exports = () => {
'use strict';

//Use debugger with node-inspector
//Used it at the beginning of my code but it can go anywhere or I can create a break in the inspector
debugger;

    const login = (req, res, next) => {
        var username = req.body.userInput;
        var password = req.body.userPass;

            if (username){
                console.log(username);
                if (username === ""){
                    console.log(username);         
                    req.flash('error', 'No username input!');                
                } else if (password === ""){
                    console.log(password);                                
                    req.flash('error', 'No password input!');                                
                }
                if (username === "admin" || username === "Admin"){
                    res.redirect('/admin');
                }else if (username !== "admin" || username !== "Admin"){
                    console.log(username);                    
                    res.redirect('/waiter/' + username);            
                    }
            } else {
                res.render('login');
            }
    };

    const waiter = (req, res, next) => {
        res.render('waiter');
    };

    const admin = (req, res) => {
        res.render('admin');        
    };

    return {
        login,
        waiter,
        admin
    }
};