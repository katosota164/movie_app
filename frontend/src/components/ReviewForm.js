import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Rating } from '@mui/material'
import laravelApiClient from '@/lib/laravelApiClient'

export default function ReviewForm({
    addReview,
    onSubmit,
    movieId,
    reviewToEdit,
}) {
    const [reviewText, setReviewText] = useState(
        reviewToEdit?.review_text || '',
    )
    const [rating, setRating] = useState(reviewToEdit?.rating || 0)
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        // バリデーション: レビュー本文と評価が入力されているか確認
        if (reviewText.trim() === '' || rating === 0) {
            setError('レビューと評価は必須です')
            return
        }

        try {
            let response
            if (reviewToEdit) {
                // 編集モードの場合
                response = await laravelApiClient.put(
                    `api/reviews/${reviewToEdit.id}`,
                    {
                        review_text: reviewText,
                        rating: rating,
                    },
                )
            } else {
                // 新規投稿の場合
                response = await laravelApiClient.post(`api/reviews`, {
                    review_text: reviewText,
                    rating: rating,
                    movie_id: movieId,
                })
            }
            console.log(response.data)
            const newReview = response.data.review
            addReview(newReview) // 新しいレビューをリストに追加
            setReviewText('') // フォームのリセット
            setRating(0)
            onSubmit()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                my: 4,
                p: 4,
                width: '80%',
                maxWidth: '800px',
                mx: 'auto',
            }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {reviewToEdit ? 'レビューを編集する' : 'レビューを投稿する'}
            </Typography>
            <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                sx={{ fontSize: '40px' }}
            />
            <TextField
                label="レビュー"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                placeholder="ここにレビューを入力してください"
                sx={{ mt: 1 }}
            />
            {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                    {error}
                </Typography>
            )}
            <Button
                variant="outlined"
                // color="primary"
                onClick={handleSubmit}
                sx={{
                    mt: 2,
                    border: '1px solid #B5B5B5',
                    color: '#333333',
                    '&:hover': {
                        backgroundColor: '#A0A0A0',
                    },
                }}>
                {reviewToEdit ? 'レビューを更新する' : 'レビューを投稿する'}
            </Button>
        </Box>
    )
}
