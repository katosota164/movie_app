import LikeButton from '@/components/LikeButton'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import React from 'react'

export default function MovieDetail({ movie }) {
    if (!movie) {
        return <CircularProgress />
    }

    return (
        <Box py={3}>
            <Box maxWidth="lg" mx="auto">
                <Grid container spacing={3} sx={{ p: '30px' }}>
                    <Grid item xs={12} md={5}>
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                            alt={movie.title || movie.original_title}
                            style={{
                                width: '100%',
                                maxHeight: '500px',
                                objectFit: 'contain',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            sx={{ mt: '50px' }}>
                            {movie.title || movie.original_title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mt: '30px' }}>
                            {movie.overview || 'あらすじがありません。'}
                        </Typography>
                        <Grid item sx={{ textAlign: 'right' }}>
                            <LikeButton movieId={movie.id} /> 
                        </Grid>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ mt: '10px' }}>
                            公開日： {movie.release_date}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}
