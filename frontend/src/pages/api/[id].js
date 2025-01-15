// export default async function handler(req, res) {
//     const { id } = req.query
//     try {
//         const response = await fetch(
//             `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
//         )
//         if (!response.ok) {
//             throw new Error('Network response was not ok')
//         }
//         const data = await response.json()
//         res.status(200).json(data)
//         console.log(data)
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             message: 'エラーが発生しました',
//             error: error.toString(),
//         })
//     }
// }
