import { useEffect, useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import IconButton from '@mui/material/IconButton'
import laravelApiClient from '@/lib/laravelApiClient'

export default function LikeButton({ movieId }) {
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                const likeResponse = await laravelApiClient.get(
                    'api/likes/status',
                    {
                        params: {
                            movie_id: movieId,
                        },
                    },
                )
                setLiked(likeResponse.data)
                console.log(likeResponse.data) // likeResponse.dataがtrueかfalseかをチェック
            } catch (error) {
                console.log(error)
            }
        }
        fetchLikes()
    }, [movieId]) // movieIdが変わるたびに実行されるようにする

    const handleLikeClick = async () => {
        try {
            const response = await laravelApiClient.post('api/likes', {
                movie_id: movieId,
            })
            console.log(response.data)
            setLiked(response.data.status === 'added')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <IconButton onClick={handleLikeClick}>
            {liked ? (
                <FavoriteIcon sx={{ fontSize: 40 }} color="error" />
            ) : (
                <FavoriteBorderIcon sx={{ fontSize: 40 }} />
            )}
        </IconButton>
    )
}
