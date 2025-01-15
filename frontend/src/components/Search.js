// frontend/src/components/Search.js
import React, { useState, useEffect } from 'react'
import {
    TextField,
    InputAdornment,
    Button,
    Box,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useRouter } from 'next/router'

export default function Search({ onSearch }) {
    const router = useRouter()
    const [query, setQuery] = useState('')

    // 新たに追加する状態変数
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')
    const [year, setYear] = useState('')

    // コンポーネントマウント時にジャンル一覧を取得
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('/api/getGenres')
                if (!response.ok) {
                    throw new Error('Failed to fetch genres')
                }
                const data = await response.json()
                // data.genres は [{ id: 28, name: 'Action' }, ...] という配列
                setGenres(data.genres)
            } catch (error) {
                console.error(error)
            }
        }
        fetchGenres()
    }, [])

    const handleInputChange = event => {
        setQuery(event.target.value)
    }

    const handleGenreChange = event => {
        setSelectedGenre(event.target.value)
    }

    const handleYearChange = event => {
        setYear(event.target.value)
    }

    // 「検索」ボタン押下時の動作を切り替え
    const handleSearchClick = e => {
        e.preventDefault()
        // タイトル検索だけの場合は従来通り `/search/[query]` へ
        if (query) {
            router.push(`/search/${query}`)
            return
        }
        // ジャンルや公開年フィルタの場合は、フィルタ専用ページ(例)へ遷移
        // ここでは例として `/filtered` ページにクエリを付与して遷移する形をとっています。
        // ページ構成は好みで変えてください。
        router.push({
            pathname: '/filtered',
            query: {
                genre: selectedGenre,
                year: year,
            },
        })
    }

    return (
        <div
            style={{
                width: '100%',
                display: 'flex',
                marginTop: '40px',
                justifyContent: 'center',
            }}>
            <Box
                sx={{
                    width: '80%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    maxWidth: '500px',
                    gap: 1,
                }}>
                {/* タイトル検索用のTextField */}
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="映画タイトルを検索"
                    value={query}
                    onChange={handleInputChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* ジャンル選択用のSelect */}
                <FormControl fullWidth>
                    <InputLabel id="genre-select-label">ジャンル</InputLabel>
                    <Select
                        labelId="genre-select-label"
                        value={selectedGenre}
                        label="ジャンル"
                        onChange={handleGenreChange}
                    >
                        <MenuItem value="">
                            <em>未選択</em>
                        </MenuItem>
                        {genres.map(genre => (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* 公開年入力用のTextField */}
                <TextField
                    variant="outlined"
                    fullWidth
                    placeholder="公開年（例: 2021）"
                    value={year}
                    onChange={handleYearChange}
                />

                {/* 検索ボタン */}
                <Button
                    variant="outlined"
                    sx={{
                        border: '1px solid #B5B5B5',
                        color: '#333333',
                        '&:hover': {
                            backgroundColor: '#A0A0A0',
                        },
                    }}
                    onClick={handleSearchClick}
                >
                    検索
                </Button>
            </Box>
        </div>
    )
}
