
const key = process.env.REACT_APP_API_KEY

const requests = {
    fetchTrending: `/trending/all/week?api_key=${key}&language=en-US`,
    fetchMovies: `/movie/popular/?api_key=${key}`
}

export default requests