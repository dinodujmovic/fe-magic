export interface IMoveDetailsResponse {
    id: number;
    backdrop_path: string;
    budget: number;
    original_title: string;
    title: string;
    overview: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    genres: Genre[];
    runtime: number;
}

interface Genre {
    id: number;
    name: string;
}
