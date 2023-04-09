const DEFAULT = {
    page: 1,
    error: undefined,
    loading: false,
    totalPages: 1,
    totalResults: 2,
};

const MOVIES = [
    {
        id: 1,
        title: "Avatar",
        name: "Avatar",
        release_date: "20 Jan 2023",
        overview: "Avatar movie",
        poster_path: "/path",
        vote_average: 5.5,
    },
    {
        id: 2,
        title: "John Wick 4",
        name: "John Wick 4",
        release_date: "20 Jan 2020",
        overview: "John Wick 4 movie",
        poster_path: "/path",
        vote_average: 5.5,
    }
];

export const TRENDING_MOVIES_STATE_MODEL_MOCK = {
    ...DEFAULT,
    data: MOVIES
};

export const TRENDING_MOVIES_STATE_MODEL_LOADING = {
    ...DEFAULT,
    loading: true,
    data: []
};
