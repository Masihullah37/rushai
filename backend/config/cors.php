<?php

// Configuration CORS pour Laravel 11
// Autorise les requêtes depuis le frontend React (localhost:5173)

return [

    // Routes concernées par CORS
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // Méthodes HTTP autorisées
    'allowed_methods' => ['*'],

    // Origines autorisées — frontend React en développement et production
    'allowed_origins' => [
        'http://localhost:5173',     // développement local Vite
        'http://localhost:3000',     // alternative locale
        'https://rushai.pro',        // production
        'https://www.rushai.pro',    // production avec www
    ],

    'allowed_origins_patterns' => [],

    // Headers autorisés
    'allowed_headers' => ['*'],

    // Headers exposés au navigateur
    'exposed_headers' => [],

    // Durée du cache preflight (en secondes)
    'max_age' => 0,

    // Autoriser les cookies cross-origin
    'supports_credentials' => false,

];