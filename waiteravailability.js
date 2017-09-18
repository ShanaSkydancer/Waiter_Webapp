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
        var resetButton = req.body.resetButton;

        workingModel.find({}, (err, waiterDocuments) => {
            if (err){
                return next(err);
                console.log('Error trying to find waiter');                    
            } else{        
                function getDayStatus(waitersWorking) {
                    // console.log(waitersWorking)
                    if (waitersWorking.length > 3) {
                        return 'red';
                    } else if (waitersWorking.length === 3) {
                        return 'green';
                    } else if (waitersWorking.length < 3) {
                        return 'normal';
                    }
                }
                var workingList = { 
                    Sunday : [],
                    Monday : [],
                    Tuesday : [],
                    Wednesday : [],
                    Thursday : [],
                    Friday : [],
                    Saturday : [] 
                }
                
                if (waiterDocuments) {
                    waiterDocuments.forEach((waiter) => {
                        waiter.days.forEach((day) => {
                            // console.log(day);
                            workingList[day].push(waiter.waiter);
                        })
                    })            

                    var statusList = {
                        SundayStatus : getDayStatus(workingList.Sunday),
                        MondayStatus : getDayStatus(workingList.Monday),
                        TuesdayStatus : getDayStatus(workingList.Tuesday),
                        WednesdayStatus : getDayStatus(workingList.Wednesday),
                        ThursdayStatus : getDayStatus(workingList.Thursday),
                        FridayStatus : getDayStatus(workingList.Friday),
                        SaturdayStatus : getDayStatus(workingList.Saturday)
                    }
                    // console.log(SundayStatus);
                    res.render('admin', { 
                        workingList : workingList,
                        status : statusList
                    });
                }
            };
        });
    };

    const remove = (req, res, next) => {
        let resetButton = req.body.resetButton;

        workingModel.remove({}, function(err, removed){
        if (err) {
            console.log(err);
        } else {
            console.log('Data has been deleted!')
            res.redirect('/admin');
            }
        });
    }


    return {
        login,
        waiter,
        admin,
        remove
    }
};