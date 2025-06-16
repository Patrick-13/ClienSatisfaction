<?php

namespace App\Http\Controllers;

use App\Models\CustomerRating;
use App\Http\Requests\StoreCustomerRatingRequest;
use App\Http\Requests\UpdateCustomerRatingRequest;
use App\Http\Resources\CustomerRatingResource;
use App\Models\Appointment;
// use App\Services\TwilioService;
use App\Services\MoceanService;

class CustomerRatingController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRatingRequest $request, MoceanService $mocean)
    {
        $validated = $request->validated();

        foreach ($validated['ratings'] as $index => $rating) {
            CustomerRating::create([
                'odName' => $validated['odName'],
                'appointmentNumber' => $validated['appointmentNumber'],
                'date' => $validated['date'],
                'clientName' => $validated['clientName'],
                'sex' => $validated['sex'],
                'sector' => $validated['sector'],
                'companyName' => $validated['companyName'],
                'address' => $validated['address'],
                'contactNumber' => $validated['contactNumber'],
                'email' => $validated['email'],

                // Rating-specific fields
                'timeIn' => $rating['timeIn'],
                'timeOut' => $rating['timeOut'],
                'transactionType' => $rating['transactionType'],
                'unitVisited' => $rating['unitVisited'],
                'personnel' => $rating['personnel'],
                'rating' => $rating['rating'],
                'comments' => $rating['comments'],
                'rating_order' => $index + 1,
            ]);
        }

        // $number = preg_replace('/^0/', '+63', $validated['contactNumber']);
        // $twilio->sendSms($validated['contactNumber'], 'Hello from Laravel + Twilio!');
        // $mocean->sendSms($validated['contactNumber'], 'Good Day, This is to inform you that you were the OD tomorrow, Thanks!');


        return redirect()->route('client.index')->with([
            'success' => 'Customer Satisfaction Created Successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */

    public function show($appointmentNumber)
    {
        $appointment = Appointment::where('appointmentNumber', $appointmentNumber)->first();

        if (!$appointment) {
            return response()->json(['message' => 'Appointment not found'], 404);
        }

        return response()->json($appointment);
    }
}
