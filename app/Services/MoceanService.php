<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MoceanService
{
    public function sendSms($to, $message)
    {
        $response = Http::asForm()->post('https://rest.moceanapi.com/rest/2/sms', [
            'mocean-api-key' => env('MOCEAN_API_KEY'),
            'mocean-api-secret' => env('MOCEAN_API_SECRET'),
            'mocean-from' => env('MOCEAN_FROM'), // or hardcode your sender ID
            'mocean-to' => $to,
            'mocean-text' => $message,
        ]);

        if ($response->successful()) {
            return true;
        } else {
            // You can log the error if needed
            Log::error('Mocean SMS failed', ['response' => $response->body()]);
            return false;
        }
    }
}
