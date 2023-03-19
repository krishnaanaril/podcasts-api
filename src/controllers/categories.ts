import { Get, Query, Route } from "tsoa";

import { CategoriesResponse } from "../types/category";
import { AnyQueryOptions, SearchResponse, SoundbitesResponse, StatsResponse, TrendingResponse } from '../types/shared';
import { DataService } from '../types/data-service';

@Route("/")
export default class CategoriesController {

    private _dataService: DataService;

    constructor(dataService: DataService) {
        this._dataService = dataService;
    }

    @Get("/categories")
    public async getCategories(): Promise<CategoriesResponse> {
        const result = await this._dataService.fetch<CategoriesResponse>("/categories/list");
        return result;
    }

    @Get("/stats")
    public async getStats(): Promise<StatsResponse> {
        const result = await this._dataService.fetch<StatsResponse>("/stats/current");
        return result;
    }

    @Get("/trending")
    public async getTrending(
        @Query() max?: number,
        @Query() lang?: string,
        @Query() since?: number,
        @Query() cat?: string
    ): Promise<TrendingResponse> {
        let qs: AnyQueryOptions = {
            max: max ?? 25,
            lang: lang ?? 'en',
            since: since,
            cat: cat
        };
        const result = await this._dataService.fetch<TrendingResponse>("/podcasts/trending", qs);
        return result;
    }

    @Get("/soundbites")
    public async getSoundbites(@Query() max?: number): Promise<SoundbitesResponse> {
        let qs: AnyQueryOptions = {
            max: max
        };
        const result = await this._dataService.fetch<SoundbitesResponse>("/recent/soundbites", qs);
        return result;
    }

    @Get("/search/byterm")
    public async searchByTerm(
        @Query() q: string,
        @Query() clean?: boolean,
        @Query() max?: number,
        @Query() fulltext?: boolean
    ): Promise<SearchResponse> {
        console.log(clean, fulltext);
        console.log(typeof clean, typeof max);
        let qs: AnyQueryOptions = {
            q: q,
            max: max ?? 25,
            clean: clean,
            fulltext: fulltext,
        };
        const result = await this._dataService.fetch<SearchResponse>("/search/byterm", qs);
        return result;
    }
}