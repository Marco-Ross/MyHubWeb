import { ITitbitCategory } from "../../add-titbit/interfaces/tibit-category.interface";

export class TitbitCategory implements ITitbitCategory
{
    public id: string;
    public description: string;

    constructor(id: string, description: string)
    {
        this.id = id;
        this.description = description;
    }
}