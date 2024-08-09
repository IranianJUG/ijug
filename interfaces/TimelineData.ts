import type {EventStatus} from "~/interfaces/EventStatus";

export default interface TimelineData{

    title: string,
    date: string,
    image: string,
    description: number,
    status:EventStatus,
    icon : string
}