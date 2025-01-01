export interface DoubleValue {
    recentlyCreatedValue: number;
    globalValue: number;
}

export interface DashBoardDto {
    // General Data
    numberOfContacts: DoubleValue;
    numberOfCallsActivities: DoubleValue;
    numberOfWhatsAppActivities: DoubleValue;
    numberOfCompletedTasks: DoubleValue;
    numberOfDueCompletedTasks: DoubleValue;
    numberOfQualityControlTasks: DoubleValue;
    numberOfCallsAnswered: DoubleValue;
    numberOfCallsNotAnswered: DoubleValue;
    numberOfWhatsAppAnswered: DoubleValue;
    numberOfWhatsAppNotAnswered: DoubleValue;

    // LifeCycleStage Data
    numberOfQualifiedContacts: DoubleValue;
    numberOfOpportunitiesContacts: DoubleValue;
    numberOfCustomerContacts: DoubleValue;
    numberOfUnQualifiedContacts: DoubleValue;
    numberOfLeadContacts: DoubleValue;

    // LeadStatus Data
    numberOfNewContacts: DoubleValue;
    numberOfInProgressContacts: DoubleValue;
    numberOfAttemptedContacts: DoubleValue;
    numberOfWaitingInProductsContacts: DoubleValue;
    numberOfStoreInDesignContacts: DoubleValue;
    numberOfStoreDeliveredContacts: DoubleValue;
    numberOfBadTimingContacts: DoubleValue;
    numberOfUnQualifiedAsLeadStatusContacts: DoubleValue;
}
export const initialDashboardDto: DashBoardDto = {
    numberOfContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfWhatsAppNotAnswered: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfUnQualifiedAsLeadStatusContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfWhatsAppAnswered: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfCallsNotAnswered: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfCallsAnswered: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfCallsActivities: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfCustomerContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfWhatsAppActivities: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfCompletedTasks: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfDueCompletedTasks: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfQualityControlTasks: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfQualifiedContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfLeadContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfOpportunitiesContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfUnQualifiedContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfNewContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfInProgressContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfAttemptedContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfWaitingInProductsContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfStoreInDesignContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfStoreDeliveredContacts: { recentlyCreatedValue: 0, globalValue: 0 },
    numberOfBadTimingContacts: { recentlyCreatedValue: 0, globalValue: 0 }
};