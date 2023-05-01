import { TMoviesType } from "@core/models/types/TMoviesType";

export class GetSelectedMovies {
    static type = "[Movies] Get selected movies";
    constructor(public type: TMoviesType, public page: number) { }
}
