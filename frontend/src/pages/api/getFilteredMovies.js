// frontend/src/pages/api/getFilteredMovies.js
export default async function handler(req, res) {
    const { genre, year } = req.query

    // Discover エンドポイントにクエリパラメータを設定
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie'
    const url = new URL(baseUrl)
    url.searchParams.append('api_key', process.env.TMDB_API_KEY)
    url.searchParams.append('language', 'ja-JP')

    if (genre) {
        // TMDBの "with_genres" パラメータに設定
        url.searchParams.append('with_genres', genre)
    }
    if (year) {
        // TMDBの "primary_release_year" パラメータに設定
        url.searchParams.append('primary_release_year', year)
    }

    try {
        const response = await fetch(url.toString())
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching filtered movies:', error)
        return res.status(500).json({
            message: 'エラーが発生しました',
            error: error.toString(),
        })
    }
}
