import fetch from 'node-fetch';
import crypto from 'crypto';

import { DataService } from "../types/data-service";
import { AnyQueryOptions } from "../types/shared";
import { PODCAST_INDEX } from "./constants";

export class PodcastIndexDataService implements DataService {

    private generateHeaders() {
        const currentTime = Math.floor(Date.now() / 1000);
        const sha1Hash = crypto.createHash("sha1");
        const apiKey = process.env.API_KEY || '';
        const apiSecret = process.env.API_SECRET || '';
        console.log(`apiKey: ${apiKey}`);
        console.log(`apiSecret: ${apiSecret}`);
        const data4Hash = apiKey + apiSecret + currentTime;
        sha1Hash.update(data4Hash);
        const hash4Header = sha1Hash.digest("hex");
        const userAgent = `${process.env.npm_package_name}/${process.env.npm_package_version}`;
        console.log(`userAgent: ${userAgent}`)

        return {
            "Content-Type": "application/json",
            "X-Auth-Date": `${currentTime}`,
            "X-Auth-Key": apiKey,
            Authorization: hash4Header,
            "User-Agent": userAgent,
        };
    }

    private encodeObjectToQueryString(qs?: AnyQueryOptions) {
        if (!qs) {
            return null;
        }

        return Object.entries(qs)
            .map(([key, val]) => {
                if (!val) {
                    return null;
                }

                if (Array.isArray(val)) {
                    return `${key}[]=${(val as unknown[]).map((v) => encodeURI(`${v}`)).join(",")}`;
                }

                if (val === true) {
                    return key;
                }

                return `${key}=${encodeURI(`${val}`)}`;
            })
            .filter((x) => x)
            .join("&");
    }

    public fetch<T>(endpoint: string, qs?: AnyQueryOptions): Promise<T> {        
        const queryString = qs ? this.encodeObjectToQueryString(qs) : null;
        const options = {
            method: `GET`,
            headers: this.generateHeaders(),
        };
        const apiUrl = process.env.API_URL;
        console.log(`apiUrl: ${apiUrl}`);
        console.log(`queryString: ${queryString}`);
        const url = `${apiUrl}${endpoint}${queryString ? `?${queryString}` : ``}`;        
        return fetch(url, options).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return res.json() as T;
            }
            throw new Error(res.statusText);
        });
    }
}