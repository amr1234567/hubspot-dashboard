export default interface Activity {
    id: string;
    active: boolean;
    createdAt?: Date;
    lastUpdated?: Date;
    createdById: string;
    modifiedById?: string;
    ownerId: string;
    engagementType: EngagementType;
    source: EngagementSource;
    attachments?: Attachment[];
    engagementStatus: EngagementStatus;
    title: string;
    bodyPreview: string;
    taskType?: TaskType;
    deadLineDate: Date;
    completionDate?: Date;
    callIsAnswered?: boolean;
    activityIssues?: ActivityIssue[];
}

export type ActivityIssue = 'NoSnippet' | 'NoAttachmentsForWhatsApp' | 'NoAttachmentsForCall' | 'TaskDue';

export type TaskType = 'None' | 'Todo' | 'Email' | 'Call';
export type EngagementStatus =
    | 'None'
    | 'Not_Started'
    | 'In_Progress'
    | 'Scheduled'
    | 'Completed'
    | 'Overdue'
    | 'Failed'
    | 'NOT_LOGGED';

export type Attachment = {
    id?: string;
}

export type EngagementSource =
    | 'INBOUND'
    | 'OUTBOUND'
    | 'CALL'
    | 'EMAIL'
    | 'SOCIAL'
    | 'WEB'
    | 'API';

export type EngagementType =
    | 'Email'
    | 'Call'
    | 'Meeting'
    | 'Task'
    | 'Note'
    | 'App_Integration'
    | 'Social_Media'
    | 'Form_Submission'
    | 'Survey_Response'
    | 'Deal_Task'
    | 'Ticket_Task'
    | 'Marketing_Campaign'
    | 'Document'
    | 'Custom_Engagement'
    | 'Whats_App';