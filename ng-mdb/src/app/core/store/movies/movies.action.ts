import { TTime } from "../../models/types/TTime";

export class GetTrendingMovies {
    static type = '[Movies] Get trending movies';
    constructor(public time?: TTime) { }
}

export class GetNowPlayingMovies {
    static type = '[Movies] Get now playing movies';

    constructor() { }
}

