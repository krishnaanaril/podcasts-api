import { Get, Route } from "tsoa";
import { PingResponse } from "../types/ping-response";

@Route("ping")
export default class PingController {

    @Get("/")
    public async getMessage(): Promise<PingResponse> {
        console.log(`${process.env.npm_package_name}/${process.env.npm_package_version}` );
        return {
            message: "pong",
        };
    }
}