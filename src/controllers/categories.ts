import { Get, Query, Route } from "tsoa";

import { CategoriesResponse } from "../types/category";
import {
    AnyQueryOptions,
    EpisodesByIdResponse,
    Medium,
    PodcastsByIdResponse,
    RecentEpisodesResponse,
    RecentFeedsResponse,
    SearchResponse,
    SoundbitesResponse,
    StatsResponse,
    TrendingResponse,
    Value
} from '../types/shared';
import { DataService } from '../types/data-service';

@Route("/")
export default class CategoriesController {

    private _dataService: DataService;

    constructor(dataService: DataService) {
        this._dataService = dataService;
    }

    @Get("/categories/list")
    public async getCategories(): Promise<CategoriesResponse> {
        const result = await this._dataService.fetch<CategoriesResponse>("/categories/list");
        return result;
    }

    @Get("/stats/current")
    public async getStats(): Promise<StatsResponse> {
        const result = await this._dataService.fetch<StatsResponse>("/stats/current");
        return result;
    }

    @Get("/podcasts/trending")
    public async getTrending(
        @Query() max?: number,
        @Query() lang?: string,
        @Query() since?: number,
        @Query() cat?: string,
        @Query() notcat?: string
    ): Promise<TrendingResponse> {
        let qs: AnyQueryOptions = {
            max: max ?? 25,
            lang: lang ?? 'en',
            since: since,
            cat: cat,
            notcat: notcat
        };
        const result = await this._dataService.fetch<TrendingResponse>("/podcasts/trending", qs);
        return result;
    }

    @Get("/recent/soundbites")
    public async getSoundbites(
        @Query() max?: number
    ): Promise<SoundbitesResponse> {
        let qs: AnyQueryOptions = {
            max: max
        };
        const result = await this._dataService.fetch<SoundbitesResponse>("/recent/soundbites", qs);
        return result;
    }

    @Get("/recent/episodes")
    public async getRecentEpisodes(
        @Query() max?: number,
        @Query() before?: number,
        @Query() excludeString?: string,
        @Query() fulltext?: boolean
    ): Promise<RecentEpisodesResponse> {
        let qs: AnyQueryOptions = {
            max: max ?? 25,
            excludeString: excludeString,
            before: before,
            fulltext: fulltext
        };
        const result = await this._dataService.fetch<RecentEpisodesResponse>("/recent/episodes", qs);
        return result;
    }

    @Get("/recent/feeds")
    public async getRecentFeeds(
        @Query() max?: number,
        @Query() lang?: string,
        @Query() since?: number,
        @Query() cat?: string,
        @Query() notcat?: string
    ): Promise<RecentFeedsResponse> {
        let qs: AnyQueryOptions = {
            max: max ?? 25,
            lang: lang ?? 'en',
            since: since,
            cat: cat,
            notcat: notcat
        };
        const result = await this._dataService.fetch<RecentFeedsResponse>("/recent/feeds", qs);
        return result;
    }

    @Get("/podcasts/byfeedid")
    public async getPodcastsById(
        @Query() id?: number,
    ): Promise<PodcastsByIdResponse> {
        let qs: AnyQueryOptions = {
            id
        }
        const result = await this._dataService.fetch<PodcastsByIdResponse>("/podcasts/byfeedid", qs);
        return result;
    }

    @Get("/podcasts/bymedium")
    public async getPodcastsByMedium(
        @Query() medium?: Medium,
    ): Promise<PodcastsByIdResponse> {
        let qs: AnyQueryOptions = {
            medium
        }
        console.log(qs, medium);
        const result = await this._dataService.fetch<PodcastsByIdResponse>("/podcasts/bymedium", qs);
        return result;
    }

    @Get("/episodes/byfeedid")
    public async getEpisodesById(
        @Query() id?: string,
    ): Promise<EpisodesByIdResponse> {
        let qs: AnyQueryOptions = {
            id
        }
        const result = await this._dataService.fetch<EpisodesByIdResponse>("/episodes/byfeedid", qs);
        return result;
    }

    @Get("/search/byterm")
    public async searchByTerm(
        @Query() q: string,
        @Query() clean?: boolean,
        @Query() max?: number,
        @Query() fulltext?: boolean,
        @Query() val?: Value,
        @Query() aponly?: boolean
    ): Promise<SearchResponse> {
        let qs: AnyQueryOptions = {
            q: q,
            max: max ?? 25,
            val: val,
            aponly: aponly,
            clean: clean,
            fulltext: fulltext,
        };
        const result = await this._dataService.fetch<SearchResponse>("/search/byterm", qs);
        return result;
    }
}