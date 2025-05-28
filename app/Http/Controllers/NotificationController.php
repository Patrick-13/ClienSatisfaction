<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerRatingResource;
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
        $badRatings = CustomerRating::where('rating', 'Bad')
            ->where('created_at', '>=', Carbon::now()->subHours(24))
            ->orderBy('created_at', 'desc')
            ->get(['id', 'odName', 'clientName', 'timeIn', 'timeOut', 'rating', 'created_at']);

        $veryBadRatings = CustomerRating::where('rating', 'Very Bad')
            ->where('created_at', '>=', Carbon::now()->subHours(24))
            ->orderBy('created_at', 'desc')
            ->get(['id', 'odName', 'clientName', 'timeIn', 'timeOut', 'rating', 'created_at']);

        return response()->json([
            'badCount' => $badRatings->count(),
            'veryBadCount' => $veryBadRatings->count(),
            'bads' => $badRatings,
            'veryBads' => $veryBadRatings,
        ]);
    }


    public function show($clientId)
    {
        $clientratingdata = CustomerRating::findOrFail($clientId);

        return inertia("CustomerRating/Show", [
            "clientratingdata" => $clientratingdata,
        ]);
    }
}
