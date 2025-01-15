<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $movieId = $request->query('movie_id');
        if ($movieId) {
            $reviews = Review::with('user')->where('movie_id', $movieId)->get();
        } else {
            $reviews = Review::with('user')->get();
        }
        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // バリデーション
            $validatedData = $request->validate([
                'review_text' => 'required|string|max:255',
                'movie_id' => 'required|integer',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            // 新しいレビューの作成
            $review = Review::create([
                'user_id' => Auth::id(),
                'movie_id' => $validatedData['movie_id'],
                'review_text' => $validatedData['review_text'],
                'rating' => $validatedData['rating'],
            ]);

            // 作成されたレビューをユーザー情報と共に再取得
            $reviewWithUser = Review::with('user')->find($review->id);

            // レスポンスにユーザー情報を含めて返す
            return response()->json([
                'message' => 'Review saved successfully!',
                'review' => $reviewWithUser
            ], 201);
        } catch (\Exception $e) {
            // 何らかのエラーが発生した場合のレスポンス
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($movie_id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'review_text' => 'required|string|max:255',
                'rating' => 'required|integer|min:1|max:5',
            ]);

            $review = Review::findOrFail($id);
            // ログインユーザーのIDと投稿者が一致するか確認
            if ($review->user_id !== Auth::id()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // レビューを更新
            $review->update([
                'review_text' => $validatedData['review_text'],
                'rating' => $validatedData['rating'],
            ]);

            // 更新されたレビューをユーザー情報と共に再取得
            $updatedReviewWithUser = Review::with('user')->find($review->id);

            // レスポンスに更新されたレビューとユーザー情報を含めて返す
            return response()->json([
                'message' => 'Review updated successfully!',
                'review' => $updatedReviewWithUser
            ], 200);
        } catch (\Exception $e) {
            // 何らかのエラーが発生した場合のレスポンス
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(["message" => "The review has been successfully deleted." ]);
    }
}
