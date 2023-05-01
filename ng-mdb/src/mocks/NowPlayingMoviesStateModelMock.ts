const DEFAULT = {
    page: 1,
    error: undefined,
    loading: false,
    totalPages: 1,
    totalResults: 3,
};

const MOVIES = [
    {
        id: 1,
        title: "John Wick 2",
        name: "John Wick 2",
        release_date: "20 Jan 2023",
        overview: "John Wick 2 movie",
        poster_path: "/path",
        backdrop_path: "/backdrop_path",
        vote_average: 5.5,
    },
    {
        id: 2,
        title: "Lord of the rings",
        name: "Lord of the rings",
        release_date: "20 Jan 2016",
        overview: "Lord of the rings",
        poster_path: "/path",
        backdrop_path: "/backdrop_path",
        vote_average: 5.5,
    },
    {
        id: 3,
        title: "Harry Potter",
        name: "Harry Potter",
        release_date: "20 Jan 2002",
        overview: "Harry Potter movie",
        poster_path: "/path",
        backdrop_path: "/backdrop_path",
        vote_average: 5.5,
    }
];

export const NOW_PLAYING_MOVIES_STATE_MODEL_MOCK = {
    ...DEFAULT,
    data: MOVIES
};

export const NOW_PLAYING_MOVIES_STATE_MODEL_LOADING = {
    ...DEFAULT,
    loading: true,
    data: []
};
