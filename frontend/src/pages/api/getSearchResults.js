export default async function handler(req, res) {
    const { query } = req.query // クエリパラメータから検索クエリを取得

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&language=ja-JP&query=${query}`,
        )
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const data = await response.json()
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching movies:', error)
        res.status(500).json({
            message: 'エラーが発生しました',
            error: error.toString(),
        })
    }
}
