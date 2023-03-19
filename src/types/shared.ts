export enum Status {
    True = "true",
    False = "false"
}

export type AnyQueryOptions = Record<
    string,
    string | string[] | number | number[] | boolean | undefined
>;

export type BaseResponse = {
    status: Status;
    description: string;
}

export type Stats = {
    feedCountTotal: number;
    episodeCountTotal: number;
    feedsWithNewEpisodes3days: number;
    feedsWithNewEpisodes10days: number;
    feedsWithNewEpisodes30days: number;
    feedsWithNewEpisodes90days: number;
    feedsWithValueBlocks: number;
}

export type StatsResponse = BaseResponse & {
    stats: Stats;   
}

export type Feed = {
    id: number;
    url: string; 
    title: string; 
    description: string; 
    author: string; 
    image: string; 
    artwork: string; 
    newestItemPublishTime: number; 
    itunesId: number; 
    trendScore: number; 
    language: string;
    categories: Record<number, string>;
}

export type TrendingResponse = BaseResponse & {
    feeds: Array<Feed>;
    count: number;
    max: number;
    since: number;
}

export type Item = {
    enclosureUrl: string;
    title: string;
    startTime: number;
    duration: number;
    episodeId: number;
    episodeTitle: number;
    feedTitle: number;
    feedUrl: number;
    feedId: number;
}

export type SoundbitesResponse = BaseResponse & {
    items: Array<Item>;
}

export type SearchFeed = Feed & {
    podcastGuid: string;
    originalUrl: string;
    link: string;
    ownerName: string;
    lastUpdateTime: number;
    lastCrawlTime: number;
    lastParseTime: number;
    lastGoodHttpStatusTime: number;
    lastHttpStatus: number;
    contentType: string;
    generator: string;
    explicit: boolean;
    type: number;
    dead: number;
    episodeCount: number;
    crawlErrors: number;
    parseErrors: number;
    locked: number;
    imageUrlHash: number;
    newestItemPubdate: number;
}

export type SearchResponse = BaseResponse & {
    feeds: Array<SearchFeed>;
    count: number;
    query: string;
}