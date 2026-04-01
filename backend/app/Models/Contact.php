<?php
// app/Models/Contact.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    // Champs autorisés à l'insertion en masse
    protected $fillable = [
        'name',
        'email', 
        'subject',
        'message',
        'status',
    ];
}