export class LimitDailyCheckInError extends Error {
    constructor() {
        super("You have reached the limit of daily check-ins.");
        this.name = "LimitDailyCheckInError";
    }
}
