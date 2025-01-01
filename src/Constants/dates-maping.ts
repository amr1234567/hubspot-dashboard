import { InjectionToken, Provider, ValueProvider } from "@angular/core";


export type DateMappingType = {
    dateName?: string;
    dateFrom?: Date | null;
    dateTo?: Date | null;
}

const getDateRanges = (): DateMappingType[] => {
    const now = new Date();

    // Today starts at 12:00 AM today and has no end
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

    // Yesterday starts at 12:00 AM yesterday and ends at 12:00 AM today
    const startOfYesterday = new Date(startOfDay);
    startOfYesterday.setDate(startOfDay.getDate() - 1);

    // This week starts at 12:00 AM last Saturday and has no end
    const startOfWeek = new Date(startOfDay);
    const dayOfWeek = startOfDay.getDay();
    let daysToLastSaturday;

    switch (dayOfWeek) {
        case 0: // Sunday
            daysToLastSaturday = 1;
            break;
        case 1: // Monday
            daysToLastSaturday = 2;
            break;
        case 2: // Tuesday
            daysToLastSaturday = 3;
            break;
        case 3: // Wednesday
            daysToLastSaturday = 4;
            break;
        case 4: // Thursday
            daysToLastSaturday = 5;
            break;
        case 5: // Friday
            daysToLastSaturday = 6;
            break;
        case 6: // Saturday
            daysToLastSaturday = 0;
            break;
        default:
            throw new Error("Invalid day of the week");
    }

    startOfWeek.setDate(startOfDay.getDate() - daysToLastSaturday);

    const startOfLastWeek = new Date(startOfWeek);
    startOfLastWeek.setDate(startOfWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6); // End of Friday
    endOfLastWeek.setHours(23, 59, 59, 999);

    // This month starts at 12:00 AM on the first day of the current month and has no end
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

    // Last month starts at 12:00 AM on the first day of the previous month and ends at the last day
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999); // Last day of the previous month

    // This year starts at 12:00 AM on the first day of the year and ends at the last day of the year
    const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0, 0);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    return [
        {
            dateName: 'today',
            dateFrom: startOfDay,
        },
        {
            dateName: 'yesterday',
            dateFrom: startOfYesterday,
            dateTo: startOfDay,
        },
        {
            dateName: 'this week',
            dateFrom: startOfWeek,
        },
        {
            dateName: 'last week',
            dateFrom: startOfLastWeek,
            dateTo: endOfLastWeek,
        },
        {
            dateName: 'this month',
            dateFrom: startOfMonth,
        },
        {
            dateName: 'last month',
            dateFrom: startOfLastMonth,
            dateTo: endOfLastMonth,
        },
        {
            dateName: 'this year',
            dateFrom: startOfYear,
            dateTo: endOfYear,
        },
        {
            dateName: 'Custom Range'
        } as DateMappingType
    ];
};

export const datesMappingTokenInjector = new InjectionToken<DateMappingType[]>("DateMapping");

// Define the provider that injects the datesMapping
const datesMappingProvider: Provider = [
    {
        provide: datesMappingTokenInjector,
        useValue: getDateRanges()  // Call the function to get the dates mapping
    }
];

export default datesMappingProvider;