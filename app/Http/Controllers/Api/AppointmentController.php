<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AppointmentResource;
use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    //

    public function index()
    {

        $appoinmetns = Appointment::get();

        if ($appoinmetns) {
            return AppointmentResource::collect($appoinmetns);
        } else {
            return response()->json(['message' => "No record available"], 200);
        }
    }

    public function store() {}

    public function edit() {}

    public function show() {}

    public function destroy() {}
}
