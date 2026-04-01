<?php
// app/Mail/ContactMail.php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    // Données du formulaire transmises au template
    public array $formData;

    public function __construct(array $formData)
    {
        $this->formData = $formData;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Nouveau contact RushAI : {$this->formData['subject']}",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            with: ['data' => $this->formData],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}