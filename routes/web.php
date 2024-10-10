<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use App\Models\Car;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::prefix('cars')->middleware('auth')->group(function () {

    Route::get('/', [CarController::class, 'index'])->name('cars.index');

    Route::get('/create', function () {
        return Inertia::render('Car/Create');
    })->name('cars.create');

    Route::get('/edit/{car?}', function (Request $request){
       return Inertia::render('Car/Create',[
           'car' => Car::find($request->car)??null,
       ]);
    })->name('cars.edit');

    Route::post('/store', [CarController::class, 'store'])->name('cars.store');

    Route::delete('/{car}', [CarController::class, 'destroy'])->name('cars.destroy');
});
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
