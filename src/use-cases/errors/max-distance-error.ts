export class MaxDistanceError extends Error {
    constructor() {
        super("The distance between the gyms is too far.");
        this.name = "MaxDistanceError";
    }
}
