import AppLayout from '@/components/Layouts/AppLayout'
import laravelApiClient from '@/lib/laravelApiClient'
import { Card, CardMedia, Grid, Link } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

export default function like() {
    const fetcher = url => laravelApiClient.get(url).then(res => res.data)
    const { data: likeItems, error } = useSWR('api/likes', fetcher)

    console.log(likeItems)

    if (error) {
        return <div>エラーが発生しました</div>
    }

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Like
                </h2>
            }>
            <Head>
                <title>Like - CinemaLoveReview</title>
            </Head>
            <Grid container spacing={3}>
                {likeItems?.map(item => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Link
                            href={`/detail/movie/${item.id}`}
                            underline="none">
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                    alt={item.title}
                                />
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </AppLayout>
    )
}
