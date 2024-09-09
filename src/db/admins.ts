const encrypt = (name:string, password:string) => {
    let param = name + ':' + password
    return Buffer.from(param).toString('base64')
}

export const adminsDB = [ 
    {name: 'admin', password: 'qwerty', get base64() {return encrypt(this.name, this.password)}},
    {name: 'boss', password:'godlovesex', get base64() {return encrypt(this.name, this.password)}}
]