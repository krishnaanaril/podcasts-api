import { AnyQueryOptions } from "./shared";

export interface DataService {
    fetch<T>(endpoint: string, qs?: AnyQueryOptions): Promise<T>;
}