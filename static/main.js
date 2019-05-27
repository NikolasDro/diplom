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
        let username = this.username;
		let firstName = this.name.firstName;
		let lastName = this.name.lastName;
        let password = this.password;
        	
        return ApiConnector.createUser({	
            username,
            name: { firstName, lastName },
            password	
        },	
            (err, data) => {	
                console.log(`Creating user ${this.username}`);	
                callback(err, data);	
            });	
    }

    performLogin(callback) {
		let username = this.username;
		let password = this.password;
		return ApiConnector.performLogin({ username, password }, (err, data) => {
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

    const fedor = new Profile({
		username: 'fedor',
		name: { firstName: 'Fedor', lastName: 'Sumkin' },
		password: 'myprecious'
    });

    const scrooge = new Profile({
		username: 'scrooge',
		name: { firstName: 'Scrooge', lastName: 'McDuck'},
		password: 'mydollar'
	});
    
    

}




// Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
//     if (err) {
//         console.error('Error during adding money to Ivan');
//         } else {
//             console.log(`Added 500000 euros to Ivan`);
//     });
// }