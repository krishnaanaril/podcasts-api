import { Status } from "./shared";

export type Category = {
    id: number;
    name: string;
};

export type CategoriesResponse = {
    status: Status,
    count: number,
    description: string,
    feeds: Category[]
}