<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\OfficerScheduler;

class SendScheduledSms extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    protected $signature = 'sms:send-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder sms for officer schedules one day in advance.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        // Get schedules for tomorrow
        $schedules = OfficerScheduler::whereDate('date', $tomorrow)->get();

        foreach ($schedules as $schedule) {
            // Assuming you have a phone number column in your schedule model, e.g. 'phone_number'
            $phoneNumber = $schedule->contact_number;

            if (!$phoneNumber) {
                Log::warning("No phone number for schedule ID {$schedule->id}");
                continue; // skip if no phone number
            }

            $response = Http::asForm()->post('https://rest.moceanapi.com/rest/2/sms', [
                'mocean-api-key' => env('MOCEAN_API_KEY'),
                'mocean-api-secret' => env('MOCEAN_API_SECRET'),
                'mocean-from' => env('MOCEAN_FROM'),
                'mocean-to' => $phoneNumber,
                'mocean-text' => 'Hello from EMB - HR - Your schedule for OD is tomorrow!',
            ]);

            if ($response->successful()) {
                $this->info("SMS sent successfully to {$phoneNumber}.");
            } else {
                Log::error('Mocean SMS failed for ' . $phoneNumber, [
                    'response' => $response->body(),
                ]);
                $this->error("Failed to send SMS to {$phoneNumber}.");
            }
        }
    }
}
