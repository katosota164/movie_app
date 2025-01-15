<?php

namespace App\Http\Controllers;

use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class LikeController extends Controller {
    public function index() {
        $api_key = config('services.tmdb.api_key');
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $likes = $user->likes;
        $details = [];

        foreach ($likes as $like) {
            $tmdb_api_url = "https://api.themoviedb.org/3/movie/{$like->movie_id}?api_key={$api_key}";

            Log::info('Sending request to TMDB API', [
                'url' => $tmdb_api_url,
                'movie_id' => $like->movie_id,
            ]);

            $response = Http::withOptions(['verify' => false]) // SSL 検証を無効化
                ->get($tmdb_api_url);

            if ($response->successful()) {
                $details[] = $response->json();
            } else {
                Log::error('Error in TMDB API request', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        }

        return response()->json($details);
    }


    public function toggleLike(Request $request) {
        $validatedData = $request->validate([
            'movie_id' => 'required|integer',
        ]);

        $like = Like::where('user_id', Auth::id())
        ->where('movie_id', $validatedData['movie_id'])
        ->first();

        if ($like) {
            $like->delete();
            return response()->json(['status' => 'removed']);
        } else {
            Like::create([
                'movie_id' => $validatedData['movie_id'],
                'user_id' => Auth::id(),
            ]);
            return response()->json(['status' => 'added']);
        }
    }

    public function checkLikeStatus(Request $request) {
        $validatedData = $request->validate([
            'movie_id' => 'required|integer',
        ]);

        $isLike = Like::where('user_id', Auth::id())
        ->where('movie_id', $validatedData['movie_id'])
        ->exists();

        return response()->json($isLike);
    }
}
