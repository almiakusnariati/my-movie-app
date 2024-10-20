import axios from "axios";

const API_KEY = '0e95c30c129df5abf8d215229ee724e9'; // Replace with your TMDb API key
const BASE_URL = 'https://api.themoviedb.org/3';

export const getNowPlayingMovies = async (limit: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page: 1,
            },
        });
        // Limit the number of movies returned to the specified limit
        return response.data.results.slice(0, limit);
    } catch (error) {
        console.error('Error fetching Now Playing movies:', error);
        return [];
    }
};

export const getPopularMovies = async (page: number, limit: number) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`, {
            params: {
                api_key: API_KEY,
                language: 'en-US',
                page,
            },
        });
        // Limit the number of movies returned to the specified limit
        return response.data.results.slice(0, limit);
    } catch (error) {
        console.error('Error fetching Popular movies:', error);
        return [];
    }
};
