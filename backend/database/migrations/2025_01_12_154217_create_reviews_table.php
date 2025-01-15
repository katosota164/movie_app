<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReviewsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id(); // 自動インクリメントのプライマリキー
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // ユーザーID、外部キー制約付き
            $table->bigInteger('movie_id');
            $table->text('review_text'); // レビュー本文
            $table->unsignedTinyInteger('rating'); // 1〜5の評価
            $table->timestamps(); // created_at と updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};