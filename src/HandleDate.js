import { intlFormat } from "date-fns";

export default function handleDateCreated() {
    const tmpDate = intlFormat(Date.now(), {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    return tmpDate;
}