module.exports = (workingModel) => {
'use strict';

//Use debugger with node-inspector
//Used it at the beginning of my code but it can go anywhere or I can create a break in the inspector
// debugger;

    const login = (req, res, next) => {
        var username = req.body.userInput;
        var password = req.body.userPass;

            if (username){
                if (username === ""){
                    req.flash('error', 'No username input');                
                } else if (password === ""){                              
                    req.flash('error', 'No password input');                                
                }
                if (username === "admin" || username === "Admin"){
                    res.redirect('/admin');
                } else if (username !== "admin" || username !== "Admin"){
                    res.redirect('/waiter/' + username);            
                    }
            } else {
                res.render('login');
            }
    };

    const waiter = (req, res, next) => {
        var checkbox = req.body.checkbox;
        var username = req.params.username;       
        var daysWorking = [];
        var submitButton = req.body.submitButton;
        // console.log(typeof submitButton);

        if(submitButton !== undefined){
            // console.log("submitted");
            // console.log(typeof checkbox);
            if (typeof checkbox === 'string'){
                daysWorking.push(checkbox);
            } else {
                daysWorking = checkbox;
            }
            // console.log(username);
            // console.log(checkbox);

            workingModel.findOne({waiter: username}, (err, result) => {
                if (err){
                    return next(err);
                    console.log('Error trying to find waiter');                    
                } else {
                    if (!result) {
                        // console.log(result);
                        var newwaiter = new workingModel({
                            waiter: username,
                            days: daysWorking
                        });
                        newwaiter.save((err) => {
                            if (err) {
                                return next(err);
                            } else {
                                console.log('Successfully added waiter and days working!');
                                req.flash('info', 'Successfully added waiter and days working!');
                                res.render('waiter');                       
                            };
                        });
                    } else {
                        result.days = daysWorking;
                        result.save((err, updatedDays) => {
                            if (err) console.log(err);
                        });
                        req.flash('info', 'Updated days working!');
                        res.render('waiter');
                    }
                };
            });
        }else{
            res.render('waiter');
        }
    };

    const admin = (req, res, next) => {
        var username = req.body.userInput;        

        var workingList = { 
                            Sunday : [],
                            Monday : [],
                            Tuesday : [],
                            Wednesday : [],
                            Thursday : [],
                            Friday : [] 
                        }

        workingModel.findOne({waiter: username}, (err, result) => {
            if (err){
                return next(err);
                console.log('Error trying to find waiter');                    
            } else{
                if (result) {
                    for (var i = 0; i < waiter.length; i++) {
                        var currentDay = days[i];
                        console.log(currentDay);
                        if (currentDay = "Sunday"){
                            workingList.Sunday.push(waiter);
                            console.log('Pushed waiter to Sunday Object Array!')
                            res.render('admin', {Saturday})
                        } else if (currentDay = "Monday"){
                            workingList.Monday.push(waiter);
                            console.log('Pushed waiter to Monday Object Array!')                            
                        } else if (currentDay = "Tuesday"){
                            workingList.Tuesday.push(waiter);
                            console.log('Pushed waiter to Tuesday Object Array!')                            
                        } else if (currentDay = "Wednesday"){
                            workingList.Wednesday.push(waiter);
                            console.log('Pushed waiter to Wednesday Object Array!')                            
                        } else if (currentDay = "Thursday"){
                            workingList.Thursday.push(waiter);
                            console.log('Pushed waiter to Thursday Object Array!')                            
                        } else if (currentDay = "Friday"){
                            workingList.Friday.push(waiter);
                            console.log('Pushed waiter to Friday Object Array!')                            
                        } else if (currentDay = "Saturday"){
                            workingList.Saturday.push(waiter);
                            console.log('Pushed waiter to Saturday Object Array!')                            
                        }
                    }
                    res.render('admin');
                }
            }
            res.render('admin');
        });
    };

    return {
        login,
        waiter,
        admin
    }
};