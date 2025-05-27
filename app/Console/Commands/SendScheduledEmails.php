<?php

namespace App\Console\Commands;

use App\Models\OfficerScheduler;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\OfficerSchedulerMailer;
use Illuminate\Support\Facades\Log;

class SendScheduledEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:send-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send reminder emails for officer schedules one day in advance.';
    /**
     * Execute the console command.
     */




    public function handle()
    {
        $tomorrow = now()->addDay()->format('Y-m-d');

        $schedules = OfficerScheduler::whereDate('date', $tomorrow)->get();

        Log::info("Running SendScheduledEmails for $tomorrow");


        foreach ($schedules as $schedule) {
            // Send the email to the officer
            Mail::to($schedule->email)
                ->send(new OfficerSchedulerMailer($schedule));
        }

        $this->info('Scheduled reminder emails sent successfully!');
    }
}
