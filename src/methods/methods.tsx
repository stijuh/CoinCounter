import React, {ReactNode, JSX} from "react";

export function getTimeDifferenceInHours(firstDate: Date, secondDate: Date) {
    if (firstDate === undefined || secondDate === undefined)
        return 0;

    const first = timeFromDate(firstDate)
    let firstTime = first.getTime();

    const second = timeFromDate(secondDate)
    let secondTime = second.getTime();

    return Math.abs(((firstTime - secondTime) / 60000) / 60) // difference in hours, e.g. 90min --> 1.5 hours.
}

// Returns a formatted string of the time difference between the dates in seconds, minutes or hours.
export function getTimeDifferenceFormatted(firstDate: Date, secondDate: Date) {
    if (firstDate === undefined || secondDate === undefined)
        return 0;

    const first = timeFromDate(firstDate)
    let firstTime = Math.floor(first.getTime());

    const second = timeFromDate(secondDate)
    let secondTime = Math.floor(second.getTime());

    let seconds = Math.abs((firstTime - secondTime) / 1000)
    let minutes = 0;
    let hours = 0;

    if (seconds < 60)
        return seconds + " seconds";

    if (seconds > 60) {
        minutes = seconds / 60;
        return Math.abs(Math.round(minutes)) + " minutes";
    }

    if (minutes > 60) {
        hours = minutes / 60;
        return Math.abs(Math.round(hours)) + " hours";
    }

    return "0";
}

// Returns a date that is "empty" e.g. it is the date of today, with only the time properties of the given date.
export function timeFromDate(fullDate: Date): Date {
    const timeOnlyDate = new Date()
    timeOnlyDate.setHours(fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds())
    timeOnlyDate.setHours(fullDate.getHours(), fullDate.getMinutes(), fullDate.getSeconds())
    return timeOnlyDate;
}

export function generateItemsInHTML(
    amount: number,
    item: JSX.Element | undefined = undefined,
    items: Array<JSX.Element> | undefined = undefined): ReactNode {
    if (item === undefined && items !== undefined)
        return <>
            {(() => {
                return Array.from(
                    {length: items?.length},
                    (_, i) => {
                        return React.cloneElement(items[i], {key: items[i].key + "-" + i})
                    }
                );
            })()}
        </>
    else if (item !== undefined && items === undefined)
        return <>
            {(() => {
                return Array.from(
                    {length: amount},
                    (_, i) => {
                        return React.cloneElement(item, {key: item.key + "-" + i})
                    }
                );
            })()}
        </>
}