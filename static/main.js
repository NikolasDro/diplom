"use strict"
class Profile {
    constructor({username, name: {firstName, lastName}, password}) {
        this.username = username;
        this.name = {firstName, lastName};
        this.password = password;
        this.wallet = {};
        this.isCreated = false;
        this.isLogged = false;
    }

    createUser(callback) {
        
        return ApiConnector.createUser({	
            username: this.username,
            name: { 
                firstName: this.name.firstName,
                lastName: this.name.lastName 
            },
            password: this.password	
        },	
            (err, data) => {	
                console.log(`Creating user ${this.username}`);	
                callback(err, data);	
            });	
    }

    performLogin(callback) {
	
		return ApiConnector.performLogin({ username: this.username, password: this.password }, (err, data) => {
			console.log(`Authorizing user ${this.username}`);
			callback(err, data);
        });
        
    }
    
    //transferMoney({ to, amount }, callback)
    transferMoney({ to, amount }, callback) {	
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {	
            console.log(`Transfering ${amount} of Netcoins to ${to}`);	
            callback(err, data);	
        });	
    }

    //addMoney({ currency, amount }, callback)
    addMoney({ currency, amount }, callback) {	
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {	
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);	
            callback(err, data);	
        });	
    }

    //convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback)
    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
		return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
			console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
			callback(err, data);
		});
    }
    


}

function getStocks(callback) {	
    return ApiConnector.getStocks((err, data) => {	
        console.log(`Getting stocks info`);	
        callback(err, data);	
    });	
}

function main() {

    const scrooge = new Profile({
		username: 'scrooge',
		name: { firstName: 'Scrooge', lastName: 'McDuck' },
		password: 'mydollar'
    });

    const fedor = new Profile({
		username: 'fedor',
		name: { firstName: 'Fedor', lastName: 'Sumkin'},
		password: 'fedorpass'
    });

    getStocks((err, data) => {
        if (err) {
            console.log('Error to get stocks info');
        }else{
            let stocks = data[99];
            console.log(stocks)
        

        scrooge.createUser((err, data) => {	
            if (err) {	
                console.log('Error creating user');
            } else {
                console.log('Scrooge is created!');

                scrooge.performLogin((err, data) => {	
                    if (err) {	
                        console.log('Error perform login');		
                    } else {	
                        console.log('Scrooge is authorized!');

                        scrooge.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                            if (err) {
                                console.log('Error to add money to Scrooge');
                            } else {
                                console.log('Added 500000 euros to Scrooge');
                                let targetAmount = stocks['EUR_NETCOIN'] * 500000;
                                //console.log(`NETCOINS AMOUNT: ${targetAmount}`)

                                scrooge.convertMoney({ fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: targetAmount }, (err, data) => {
                                    if (err) {
                                        console.log('Error during conversion');
                                    } else {
                                        console.log(`Converted to coins ${targetAmount}`)
                                        
                                        fedor.createUser( (err, data) => {
                                            if (err) {
                                                console.log('Error creating user');
                                            } else {
                                                console.log('Fedor is created!');
                                            
                                        
                                                scrooge.transferMoney({ to: 'fedor', amount: 36000 }, (err, data) => {
                                                    if (err) {
                                                        console.log('Failed to transfer 36000 Netcoins');
                                                    } else {
                                                        console.log('Fedor has got 36000 NETCOINS');
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        })
                    }
                })
            }
        })

    }})
}
main();