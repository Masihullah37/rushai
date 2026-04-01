<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Models\Contact;
use Resend\Laravel\Facades\Resend;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            // 1. Log incoming submission
            Log::info('Contact form submitted', $request->all());

            // 2. Data Validation
            $validated = $request->validate([
                'name'    => 'required|string|max:255',
                'email'   => 'required|email|max:255',
                'subject' => 'required|string|max:255',
                'message' => 'required|string|min:10',
            ]);

            // 3. Save to Database
            $contact = Contact::create($validated);
            Log::info('Contact saved to database', ['id' => $contact->id]);

            // 4. Logic for Recipients based on Environment
            $isLocal = app()->environment('local');
            
            /**
             * DESTINATION LOGIC:
             * Production -> contact@rushai.pro
             * Development -> p90156705@gmail.com
             */
            $companyRecipient = $isLocal ? 'p90156705@gmail.com' : 'contact@rushai.pro';
            
            /**
             * CONFIRMATION LOGIC:
             * Production -> The email the user typed in the form
             * Development -> p90156705@gmail.com (to stay within Resend Sandbox limits)
             */
            $clientRecipient = $isLocal ? 'p90156705@gmail.com' : $validated['email'];

            // 5. Send Notification to Company (or you in Dev)
            try {
                Resend::emails()->send([
                    'from'    => 'RushAI <onboarding@resend.dev>',
                    'to'      => [$companyRecipient],
                    'subject' => "Nouveau message de {$validated['name']} : {$validated['subject']}",
                    'html'    => view('emails.contact', ['data' => $validated])->render(),
                ]);
                Log::info('Company notification sent', ['to' => $companyRecipient]);
            } catch (\Exception $e) {
                Log::error('Company Email Failed: ' . $e->getMessage());
            }

            // 6. Send Confirmation to Client
            try {
                Resend::emails()->send([
                    'from'    => 'RushAI <onboarding@resend.dev>',
                    'to'      => [$clientRecipient],
                    'subject' => 'Confirmation de réception — RushAI',
                    'html'    => view('emails.confirmation', ['data' => $validated])->render(),
                ]);
                Log::info('Client confirmation sent', ['to' => $clientRecipient]);
            } catch (\Exception $e) {
                Log::error('Client Confirmation Failed: ' . $e->getMessage());
            }

            return response()->json([
                'success' => true,
                'message' => 'Votre message a été envoyé avec succès.',
                'data' => $contact
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Contact Form Global Error: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Une erreur est survenue lors de l\'envoi.',
            ], 500);
        }
    }
}