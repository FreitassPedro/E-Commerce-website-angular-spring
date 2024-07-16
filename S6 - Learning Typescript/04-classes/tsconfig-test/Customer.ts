class Customer {
    private _firstName: string;
    private _lastName: string;

    constructor(theFirst: string, theLast: string) {
        this._firstName = theFirst;
        this._lastName = theLast;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public set firtName(value: string) {
        this._firstName = value;
    }
    
}

let myCustomer = new Customer("Jhon", "Macalister");

console.log(myCustomer.firstName)


