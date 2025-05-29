<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        \App\Console\Commands\SendScheduledEmails::class,
        \App\Console\Commands\SendScheduledSms::class
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // Schedule the command to run daily at a specific time (e.g., 8 AM)
        $schedule->command('email:send-scheduled')->dailyAt('17:00');
        $schedule->command('sms:send-scheduled')->dailyAt('10:47'); // e.g., daily at 8 AM
    }




    /**
     * Register the commands for your application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');
    }
}
