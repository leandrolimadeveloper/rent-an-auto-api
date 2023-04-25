interface IDateProvider {
    compareInHours(end_date: Date, start_date: Date): number;
    convertToUtc(date: Date): string;
    dateNow(): Date;
}

export { IDateProvider };
