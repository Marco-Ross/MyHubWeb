import { ILikedUser } from "src/app/features/gallery/components/gallery/models/gallery-image.interface";
import { TitbitLink } from "../classes/titbit-link.class";
import { ITitbitCategory } from "./tibit-category.interface";

export interface ITitbit
{
    id: string;
    title: string;
    description: string;
    userId: string;
    dateUploaded: Date;
    titbitCategory: ITitbitCategory;
    titbitLinks: TitbitLink[];
    isLiked: boolean;
    likesCount: number;
    likedUsers: ILikedUser[];
    filters: ITitbitFilters;
}

export interface ITitbitFilters
{
    isLiked: boolean;
    isCategorized: boolean;
    isSearched: boolean;
}