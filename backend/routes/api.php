// backend/routes/api.php
<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// Route publique pour le formulaire de contact
Route::post('/contact', [ContactController::class, 'store']);

// Route de test (health check)
Route::get('/health', fn() => response()->json(['status' => 'ok', 'service' => 'RushAI API']));