import { BaseResponse } from "./shared";

export type Category = {
    id: number;
    name: string;
};

export type CategoriesResponse  = BaseResponse & {    
    count: number,    
    feeds: Category[]
} ;