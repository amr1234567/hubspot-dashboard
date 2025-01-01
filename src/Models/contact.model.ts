import Activitiy from "./activity.model";

export default interface Contact {
    id: string;
    createdDate: string; // ISO string format
    email: string;
    firstName: string;
    lastName?: string;
    leadStatus: LeadStatusType; // Enum-like type based on the provided values
    ownerId: string;
    lastModifiedDate: string; // ISO string format
    lifecycleStage: LifeCycleStageType; // Enum-like type based on the provided values
    website: string;
    contactIssues?: ContactIssueType[]; // Array of issues
    numberOfActivityIssues: number;
    lifeCycleStagesHistory?: HistoryStage<LeadStatusType>[]
    leadStatusHistory?: HistoryStage<LeadStatusType>[]
    activities?: Activitiy[]
}


export type LeadStatusType =
    'NEW' |
    'Open' |
    'In_Progress' |
    'Open_Deal' |
    'Unqualified' |
    'Attempted_To_Connect' |
    'Bad_Timing' |
    'Connected' |
    'Waiting_For_Products' |
    'Store_In_Design' |
    'Store_Delivered';

export type LifeCycleStageType =
    'Lead' |
    'Opportunity' |
    'Sales_Qualified_Lead' |
    'Customer' |
    'Unqualified';

export type ContactIssueType =
    'ExpiredWithNoAction' |
    'NoTasksAssigned' |
    'LateCustomer' |
    'NoActivities';


export interface HistoryStage<T> {
    value?: T;
    timestamp?: string;
    sourceId?: number;
    updatedByUserId?: number;
}