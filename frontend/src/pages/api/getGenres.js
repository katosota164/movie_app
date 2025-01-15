// frontend/src/pages/api/getGenres.js
export default async function handler(req, res) {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`
        )
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        return res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching genres:', error)
        return res.status(500).json({
            message: 'エラーが発生しました',
            error: error.toString(),
        })
    }
}
