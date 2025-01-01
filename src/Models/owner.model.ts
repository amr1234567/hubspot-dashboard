
export interface Owner {
    id: string;
    userId: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt?: Date;
    numberOfContactsIssues: number;
    numberOfContacts: number;
}
