<?php
// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Contact;
use Resend\Laravel\Facades\Resend;

class ContactController extends Controller
{
    // Traitement du formulaire de contact
    public function store(Request $request): JsonResponse
    {
        // Validation des données reçues
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        // Sauvegarder en base de données
        $contact = Contact::create($validated);

        // Envoyer l'email via Resend
        Resend::emails()->send([
            'from'    => 'RushAI <info@rushai.pro>',
            'to'      => [env('CONTACT_EMAIL', 'info@rushai.pro')],
            'subject' => "Nouveau contact : {$validated['subject']}",
            'html'    => view('emails.contact', compact('validated'))->render(),
        ]);

        // Email de confirmation au client
        Resend::emails()->send([
            'from'    => 'RushAI <info@rushai.pro>',
            'to'      => [$validated['email']],
            'subject' => 'Nous avons bien reçu votre message — RushAI',
            'html'    => view('emails.confirmation', compact('validated'))->render(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès.',
        ], 201);
    }
}