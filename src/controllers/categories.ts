import fetch from 'node-fetch';
import crypto from 'crypto';
import { Get, Route } from "tsoa";

import { CategoriesResponse } from "../types/category";
import { PODCASTINDEX } from '../utils/constants';
import { AnyQueryOptions } from '../types/shared';

@Route("categories")
export default class CategoriesController {    

    @Get("/")
    public async getCategories(): Promise<CategoriesResponse> {
        const result = await this.fetch<CategoriesResponse>("/categories/list");        
        return result;
      }

    private generateHeaders() {
        const currentTime = Math.floor(Date.now() / 1000);
        const sha1Hash = crypto.createHash("sha1");
        const data4Hash = PODCASTINDEX.API_KEY + PODCASTINDEX.API_SECRET + currentTime;
        sha1Hash.update(data4Hash);
        const hash4Header = sha1Hash.digest("hex");
        const userAgent = `${process.env.npm_package_name}/${process.env.npm_package_version}`;

        return {
            "Content-Type": "application/json",
            "X-Auth-Date": `${currentTime}`,
            "X-Auth-Key": PODCASTINDEX.API_KEY,
            Authorization: hash4Header,
            "User-Agent": userAgent,
        };
    }

    private fetch<T>(endpoint: string, qs?: AnyQueryOptions): Promise<T> {
        const start = Date.now();
        const queryString = qs ? qs : null;
        const options = {
            method: `GET`,
            headers: this.generateHeaders(),
        };
        const url = `${PODCASTINDEX.API_URL}${endpoint}${queryString ? `?${queryString}` : ``}`;
        return fetch(url, options).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json() as T;
            }
            throw new Error(res.statusText);
        });
    }
}