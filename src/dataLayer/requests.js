
const key = process.env.REACT_APP_API_KEY

const requests = {
    fetchTrending: `/trending/all/week?api_key=${key}&language=en-US`,
    fetchMovies: `/discover/movie?api_key=${key}&language=en-US&sort_by=revenue.desc&page=3`,
    fetchDetails: (id) => {
        return `/movie/${id}?api_key=${key}`
    }
}

export default requests