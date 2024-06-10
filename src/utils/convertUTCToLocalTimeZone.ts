export function convertUtcToLocal(utcTimestamp: string) {
    // Create a new Date object from the UTC timestamp
    var utcDate = new Date(utcTimestamp);

    // Get the local time offset
    var offset = utcDate.getTimezoneOffset() * 60 * 1000;

    // Convert UTC time to local time
    var localDate = new Date(utcDate.getTime() - offset);

    return localDate;
}
