const fs = require("fs");

// Generate Homebridge Username
function generateUsername() {
    const hexDigits = "0123456789ABCDEF";
    let username = "0E:";
    for (let i = 0; i < 5; i++) {
        username += hexDigits.charAt(Math.round(Math.random() * 15));
        username += hexDigits.charAt(Math.round(Math.random() * 15));
        if (i !== 4) {
            username += ":";
        }
    }
    return username;
}

// Randomly Select A Port Number
function selectPort() {
    if (!isNaN(process.env.HOMEBRIDGE_INIT_PORT)) {
        const port = parseInt(process.env.HOMEBRIDGE_INIT_PORT);
        if (port < 65535 && port > 1024) {
            return port;
        }
    }
    return Math.floor(Math.random() * (54000 - 51000 + 1) + 51000);
}

const username = generateUsername();
const port = selectPort();
const name = "Homebridge " + username.substr(username.length - 5).replace(/:/g, "");

// Base Config
const config = {
    bridge: {
        name: name,
        username: username,
        port: port,
        pin: "031-45-154"
    },
    accessories: [],
    platforms: [
        {
            platform: "mqtt",
            name: "mqtt",
            url: "mqtt://localhost"
        }
    ]
};

// Write File
console.log("Creating default config.json.");
fs.writeFileSync("./config.json", JSON.stringify(config, null, 4));

// End
process.exit();
