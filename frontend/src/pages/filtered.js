// frontend/src/pages/filtered.js
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
    Box,
    CircularProgress,
    Grid,
    Typography
} from '@mui/material'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Search from '@/components/Search'
import Link from 'next/link'

export default function Filtered() {
    const router = useRouter()
    const { genre, year } = router.query

    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFilteredMovies = async () => {
            if (!genre && !year) {
                // どちらも指定がない場合などのハンドリング
                setLoading(false)
                return
            }
            try {
                const queryString = new URLSearchParams({
                    genre: genre || '',
                    year: year || '',
                })
                const response = await fetch(`/api/getFilteredMovies?${queryString}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setMovies(data.results)
            } catch (error) {
                console.error('Error fetching filtered movies:', error)
            } finally {
                setLoading(false)
            }
        }

        if (genre || year) {
            fetchFilteredMovies()
        } else {
            setLoading(false)
        }
    }, [genre, year])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head>
                <title>Filtered Movies - CinemaLoveReview</title>
            </Head>

            {/* 検索バー（ジャンル選択・公開年設定も含む） */}
            <Search />

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box py={3} px={5}>
                    <Box maxWidth="lg" mx="auto">
                        <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
                            フィルタ結果
                        </Typography>
                        {movies.length === 0 ? (
                            <Typography>該当する映画がありません。</Typography>
                        ) : (
                            <Grid container spacing={3}>
                                {movies.map(movie => (
                                    <Grid item xs={12} sm={6} md={4} key={movie.id}>
                                        <Link
                                            href={`/detail/movie/${movie.id}`}
                                            passHref
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexFlow: 'column',
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                    cursor: 'pointer',
                                                    '&:hover': {
                                                        opacity: 0.8,
                                                    },
                                                }}
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                                    alt={movie.title}
                                                    style={{
                                                        width: 'auto',
                                                        height: '500px',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                                <Typography
                                                    variant="h6"
                                                    fontWeight="bold"
                                                    sx={{ mt: 2 }}
                                                >
                                                    {movie.title}
                                                </Typography>
                                            </Box>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Box>
            )}
        </AppLayout>
    )
}
