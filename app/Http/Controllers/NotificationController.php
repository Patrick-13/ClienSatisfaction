<?php

namespace App\Http\Controllers;

use App\Models\CustomerRating;
use Carbon\Carbon;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return inertia("Dashboard");
    }

    public function notification(Request $request)
    {

        $bad = CustomerRating::where('rating', 'Bad')
            ->where('created_at', '>=', Carbon::now()->subHours(24)) // Filter for the last 72 hours
            ->orderBy('created_at', 'desc')
            ->get(['id', 'odName', 'clientName', 'timeIn', 'timeOut', 'rating', 'created_at']);

        $veryBad = CustomerRating::where('rating', 'Very Bad')
            ->where('created_at', '>=', Carbon::now()->subHours(24)) // Filter for the last 72 hours
            ->orderBy('created_at', 'desc')
            ->get(['id', 'odName', 'clientName', 'timeIn', 'timeOut', 'rating', 'created_at']);




        $bad = $bad->count();
        $veryBad = $veryBad->count();

        return response()->json([
            'bad' => $bad,
            'veryBad' => $veryBad
        ]);
    }
}
