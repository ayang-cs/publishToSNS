const config = {
    PROD: {
        AWS: {
            ACCOUNT_ID: 742345837186,
            REGION: "us-west-2",
            PROFILE: "ProductionAdmin"
        }
    },
    DEV: {
        AWS: {
            ACCOUNT_ID: 410986195230,
            REGION: "us-west-2",
            PROFILE: "default"
        }
    }
}

module.exports = config