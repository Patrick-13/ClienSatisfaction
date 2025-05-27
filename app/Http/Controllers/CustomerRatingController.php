<?php

namespace App\Http\Controllers;

use App\Models\CustomerRating;
use App\Http\Requests\StoreCustomerRatingRequest;
use App\Http\Requests\UpdateCustomerRatingRequest;
use App\Http\Resources\CustomerRatingResource;

class CustomerRatingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Client", [
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCustomerRatingRequest $request)
    {
        $validated = $request->validated();

        foreach ($validated['ratings'] as $rating) {
            CustomerRating::create([
                'odName' => $validated['odName'],
                'date' => $validated['date'],
                'clientName' => $validated['clientName'],
                'sex' => $validated['sex'],
                'sector' => $validated['sector'],
                'companyName' => $validated['companyName'],
                'address' => $validated['address'],
                'contactNumber' => $validated['contactNumber'],
                'email' => $validated['email'],
                'comments' => $validated['comments'],
                // Rating-specific fields
                'timeIn' => $rating['timeIn'],
                'timeOut' => $rating['timeOut'],
                'transactionType' => $rating['transactionType'],
                'unitVisited' => $rating['unitVisited'],
                'personnel' => $rating['personnel'],
                'rating' => $rating['rating'],
            ]);
        }

        return redirect()->route('customer.index')->with([
            'success' => 'Customer Satisfaction Created Successfully!',
        ]);
    }

    /**
     * Display the specified resource.
     */

}
