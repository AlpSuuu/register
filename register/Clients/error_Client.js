bot.on("warn" , async(warn_message) => {
    console.warn(warn_message);
})

bot.on("error" , async(error_message) => {
    console.error(error_message)
})

let a = ["1" , "30" , "31"  , "32" , "40" , "41" , "42" , "43" , "44"].random()

class RegisterError extends Error {
    constructor(...content) {
        super(...content);
        this.RANDOM_color = a
    }

    get name() {
        return (`\x1b[${this.RANDOM_color}m[ AlpSu_Register ] =-> { RegisterError }\x1b[0m`)
    }
}

class RegisterError2 extends RangeError {
    constructor(...content) {
        super(...content);
        this.RANDOM_color = a
    }

    get name() {
        return (`\x1b[${this.RANDOM_color}m[ AlpSu_Register ] =-> { RegisterError }\x1b[0m`)
    }
}

class RegisterError3 extends TypeError {
    constructor(...content) {
        super(...content);
        this.RANDOM_color = a
    }

    get name() {
        return (`\x1b[${this.RANDOM_color}m[ AlpSu_Register ] =-> { RegisterError }\x1b[0m`)
    }
}


module.exports = RegisterError;

module.exports = RegisterError2;

module.exports = RegisterError3;