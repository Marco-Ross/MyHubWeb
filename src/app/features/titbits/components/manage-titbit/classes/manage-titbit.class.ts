import { TitbitLink } from "./titbit-link.class";

export class ManageTitbit
{
    public id: string;
    public title: string;
    public description: string;
    public categoryId: string;
    public titbitLinks: TitbitLink[];    

    constructor(id: string, title: string, titbitLinks: TitbitLink[], description: string, categoryId: string)
    {
        this.id = id;
        this.title = title;
        this.titbitLinks = titbitLinks;
        this.description = description;
        this.categoryId = categoryId;
    }
}