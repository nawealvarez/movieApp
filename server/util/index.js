class ServiceError extends Error {
    constructor(code, detail, ...params) {
        super(...params);
        this.code = code;
        this.detail = detail;
    }
}

module.exports = {
    ServiceError
}