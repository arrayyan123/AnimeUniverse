<?php

use App\Http\Controllers\MangaController;
use App\Http\Controllers\PageController;
// use App\Http\Controllers\ProfileController;
// use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;  
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/mangadetail', [PageController::class, 'mangadetail'])->name('mangadetail');
Route::get('/api/manga/{mangaId}', [MangaController::class, 'getMangaChapters']);
Route::get('/api/cover/{coverArtId}', [MangaController::class, 'getCoverImage']);
Route::get('/api/manga/{mangaId}', [MangaController::class, 'getMangaDetail']);
Route::get('/api/mangadex-slider' , function () {
    try {
        $title = request('title');
        $cover = request('cover');
        // $limit = request('limit') ?? 10; 
        $baseUrl = env('MANGADEX_API_URL');

        $response = Http::get("$baseUrl/manga", [
            'title' => $title,
            'cover' => $cover,
            // 'limit' => $limit, 
        ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Failed to fetch manga data'], $response->status());
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch manga data: ' . $e->getMessage()], 500);
    }
});
Route::get('/api/mangadex-proxy', function () {
    try {
        $title = request('title');
        $cover = request('cover');
        // $limit = request('limit') ?? 100; 
        $baseUrl = env('MANGADEX_API_URL');

        $response = Http::get("$baseUrl/manga", [
            'title' => $title,
            'cover' => $cover,
            // 'limit' => $limit, 
        ]);

        if ($response->successful()) {
            return $response->json();
        } else {
            return response()->json(['error' => 'Failed to fetch manga data'], $response->status());
        }
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch manga data: ' . $e->getMessage()], 500);
    }
});

require __DIR__.'/auth.php';
