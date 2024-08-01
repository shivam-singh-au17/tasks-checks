module.exports = {
    PRODUCT: {
        CREATE_PRODUCT: ["ADMIN"],
        UPDATE_PRODUCT: ["ADMIN", "MANAGER"],
        DELETE_PRODUCT: ["ADMIN"],
        GET_ONE_PRODUCT: ["MANAGER"],
        GET_ALL_PRODUCT: ["ADMIN", "MANAGER"],
    }
};