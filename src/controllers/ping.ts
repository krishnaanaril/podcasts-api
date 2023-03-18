import { PingResponse } from "../types/ping-response";

export default class PingController {
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "pong",
        };
    }
}