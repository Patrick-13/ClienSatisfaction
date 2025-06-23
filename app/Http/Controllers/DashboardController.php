<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerRatingResource;
use App\Http\Resources\EmployeeResource;
use App\Models\Appointment;
use App\Models\CustomerRating;
use App\Models\Division;
use App\Models\Employee;
use App\Models\OfficerScheduler;
use App\Models\Section;
use App\Models\TransactionType;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Foundation\Application;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dateFrom = request()->query('dateFrom');
        $dateTo = request()->query('dateTo');
        $sex = request()->query('sex');
        $rating = request()->query('rating');
        $sector = request()->query('sector');

        $baseQuery = CustomerRating::query()->when($dateFrom && $dateTo, function ($query) use ($dateFrom, $dateTo) {
            return $query->whereBetween('date', [$dateFrom, $dateTo]);
        })->when($sector, function ($query) use ($sector) {
            return $query->where('sector', $sector);
        })->when($sex, function ($query) use ($sex) {
            return $query->where('sex', $sex);
        })->when($rating, function ($query) use ($rating) {
            return $query->where('rating', $rating);
        });
        $appointmentsQuery = Appointment::query();

        if ($dateFrom && $dateTo) {
            $appointmentsQuery->whereBetween('date', [$dateFrom, $dateTo]);
        }

        $allAppointments = $appointmentsQuery->get();

        // Build a set of appointment numbers from ratings
        $ratedNumbers = CustomerRating::pluck('appointmentNumber')->filter()->toArray();

        $completed = $allAppointments->whereIn('appointmentNumber', $ratedNumbers)->count();
        $noshow = $allAppointments->whereNotIn('appointmentNumber', $ratedNumbers)->whereNotNull('appointmentNumber')->count();
        
        $excellent = (clone $baseQuery)->where('rating', 'Excellent')->count();
        $veryGood  = (clone $baseQuery)->where('rating', 'Good')->count();
        $Bad       = (clone $baseQuery)->where('rating', 'Bad')->count();
        $veryBad   = (clone $baseQuery)->where('rating', 'Very Bad')->count();
        $male = (clone $baseQuery)
            ->where('sex', 'Male')
            ->select('clientName', 'date')
            ->distinct()
            ->get()
            ->count();


        $female = (clone $baseQuery)
            ->where('sex', 'Female')
            ->select('clientName', 'date')
            ->distinct()
            ->get()
            ->count();

        // If the request is AJAX (like from axios), return JSON
        if (request()->wantsJson()) {
            return response()->json([
                'excellent' => $excellent,
                'veryGood'  => $veryGood,
                'Bad'       => $Bad,
                'veryBad'   => $veryBad,
                'male'   => $male,
                'female'   => $female,
                'completed' => $completed,
                'noshow' => $noshow,
            ]);
        }

        // Otherwise return the Inertia page
        return inertia("Dashboard", [
            'excellent' => $excellent,
            'veryGood'  => $veryGood,
            'Bad'       => $Bad,
            'veryBad'   => $veryBad,
            'male'       => $male,
            'female'   => $female,
            'completed' => $completed,
            'noshow' => $noshow,
        ]);
    }

    public function clientindex()
    {
        $today = Carbon::today()->toDateString();

        $todayOfficer = OfficerScheduler::whereDate('date', $today)
            ->orderBy('created_at', 'desc')
            ->first();


        $divisions = Division::orderBy('division_name', 'asc')->get();
        $sections = Section::orderBy('section_name', 'asc')->get();
        $transactiontypes = TransactionType::orderBy('transaction_name', 'asc')->get();
        $employees = Employee::orderBy('fullName', 'asc')->get();
        $units = Unit::orderBy('unit_name', 'asc')->get();


        return Inertia::render('Client', [
            'todayOfficer' => $todayOfficer,
            'divisions' => $divisions,
            'sections' => $sections,
            'transactiontypes' => $transactiontypes,
            'units' => $units,
            'employees' => $employees,
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => \Illuminate\Foundation\Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    }
}
