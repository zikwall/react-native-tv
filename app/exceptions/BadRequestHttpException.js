import HttpException from "./HttpException";

export default class BadRequestHttpException extends HttpException {
    constructor(response) {
        super('Bad Request!', response);
    }
}
