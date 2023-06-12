export interface Country
{
    id: number;
    name: string;
    capital: string;
    population: number;
}

export const countries: Country[] = [
    {
        id: 0,
        name: 'Russia',
        capital: 'Moscow',
        population: 146989754,
    },
    {
        id: 1,
        name: 'Canada',
        capital: 'Ottawa',
        population: 36624199,
    },
    {
        id: 2,
        name: 'United States',
        capital: 'Washington, D.C.',
        population: 324459463,
    },
    {
        id: 3,
        name: 'China',
        capital: 'Beijing',
        population: 1409517397,
    },
    {
        id: 4,
        name: 'South Africa',
        capital: 'Cape Town',
        population: 1239523497,
    },
    {
        id: 5,
        name: 'Australia',
        capital: 'Canberra',
        population: 234234532,
    }
];