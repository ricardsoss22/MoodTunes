<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SpotifyAPI;
use App\Http\Controllers\HistoryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::get('/history', [HistoryController::class, 'index'])->name('history');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Spotify API routes
    Route::get('/spotify/token', [SpotifyAPI::class, 'getToken'])->name('spotify.token');
    
    // History routes
    Route::post('/history/add', [HistoryController::class, 'add'])->name('history.add');
});

require __DIR__.'/auth.php';
