<?php

namespace App\Http\Controllers;

use App\Http\Resources\CustomerRatingResource;
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

        $baseQuery = CustomerRating::query()->when($dateFrom && $dateTo, function ($query) use ($dateFrom, $dateTo) {
            return $query->whereBetween('date', [$dateFrom, $dateTo]);
        })->when($sex, function ($query) use ($sex) {
            return $query->where('sex', $sex);
        })->when($rating, function ($query) use ($rating) {
            return $query->where('rating', $rating);
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $clientratingdatas = $baseQuery->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $clientratingdatas->appends(request()->only(['dateFrom', 'dateTo', 'sex', 'status', 'sort_field', 'sort_direction']));

        $totalCount = $clientratingdatas->total();

        // Get the count of positions being displayed on the current page
        $currentPageCount = $clientratingdatas->count();
        $currentPage = $clientratingdatas->currentPage();

        $excellent = (clone $baseQuery)->where('rating', 'Excellent')->count();
        $veryGood  = (clone $baseQuery)->where('rating', 'Good')->count();
        $Bad       = (clone $baseQuery)->where('rating', 'Bad')->count();
        $veryBad   = (clone $baseQuery)->where('rating', 'Very Bad')->count();
        $male   = (clone $baseQuery)->where('sex', 'Male')->count();
        $female   = (clone $baseQuery)->where('sex', 'Female')->count();

        // If the request is AJAX (like from axios), return JSON
        if (request()->wantsJson()) {
            return response()->json([
                'excellent' => $excellent,
                'veryGood'  => $veryGood,
                'Bad'       => $Bad,
                'veryBad'   => $veryBad,
                'male'   => $male,
                'female'   => $female,
            ]);
        }

        // Otherwise return the Inertia page
        return inertia("Dashboard", [
            "clientratingdatas" => CustomerRatingResource::collection($clientratingdatas),
            'excellent' => $excellent,
            'veryGood'  => $veryGood,
            'Bad'       => $Bad,
            'veryBad'   => $veryBad,
            'male'       => $male,
            'female'   => $female,
            'totalCount' => $totalCount,
            'currentPageCount' => $currentPageCount,
            'currentPage' => $currentPage,

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
        $transactiontypes = TransactionType::orderBy('id', 'asc')->get();
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
