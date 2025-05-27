<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCustomerRatingRequest;
use App\Http\Resources\CustomerRatingResource;
use App\Models\CustomerRating;
use App\Models\Division;
use App\Models\Employee;
use App\Models\Module;
use App\Models\OfficerScheduler;
use App\Models\Section;
use App\Models\TransactionType;
use App\Models\Usersystemlog;
use Carbon\Carbon;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingdataController extends Controller
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

        $query = CustomerRating::query()->when($dateFrom && $dateTo, function ($query) use ($dateFrom, $dateTo) {
            return $query->whereBetween('date', [$dateFrom, $dateTo]);
        })->when($sex, function ($query) use ($sex) {
            return $query->where('sex', $sex);
        })->when($rating, function ($query) use ($rating) {
            return $query->where('rating', $rating);
        });

        $sortField = request("sort_field", "created_at");
        $sortDirection = request("sort_direction", "desc");

        $clientratingdatas = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $clientratingdatas->appends(request()->only(['dateFrom', 'dateTo', 'sex', 'status', 'sort_field', 'sort_direction']));

        $totalCount = $clientratingdatas->total();

        // Get the count of positions being displayed on the current page
        $currentPageCount = $clientratingdatas->count();
        $currentPage = $clientratingdatas->currentPage();



        return inertia("CustomerRating/Index", [
            "clientratingdatas" => CustomerRatingResource::collection($clientratingdatas),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'totalCount' => $totalCount,
            'currentPageCount' => $currentPageCount,
            'currentPage' => $currentPage,

        ]);
    }

    /**
     * Show the form for creating a new resource.
     */


    /**
     * Display the specified resource.
     */
    public function show($ratingCategory)
    {

        $ratingInfo = CustomerRating::where('rating', $ratingCategory)->get();

        return response()->json($ratingInfo); // ✅ Must be JSON
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $clientId)
    {
        $today = Carbon::today()->toDateString();

        $todayOfficer = OfficerScheduler::whereDate('date', $today)
            ->orderBy('created_at', 'desc')
            ->first();


        $ratingInfo = CustomerRating::findOrFail($clientId);
        $divisions = Division::orderBy('division_name', 'asc')->get();
        $sections = Section::orderBy('section_name', 'asc')->get();
        $transactiontypes = TransactionType::orderBy('transaction_name', 'asc')->get();
        $employees = Employee::orderBy('fullName', 'asc')->get();


        return inertia('CustomerRating/Edit', [
            "todayOfficer" => $todayOfficer,
            "ratingInfo" => $ratingInfo,
            'divisions' => $divisions,
            'sections' => $sections,
            'transactiontypes' => $transactiontypes,
            'employees' => $employees, // Pass the employee to the view
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRatingRequest $request, $clientId)
    {
        $customerRating = CustomerRating::findOrFail($clientId);

        $user = Auth::user();
        $userId = $user ? $user->id : 'unknown';
        $userEmail = $user ? $user->email : 'unknown';
        $userIp = $request->ip();
        $data = $request->validated();
        $oldAttributes = $customerRating->getOriginal();

        $actions = 'Update';
        $modules = 'clientsatisfactiondata';

        $module = Module::where('name', $modules)->first();
        $moduleId = $module ? $module->id : null;


        $changes = [];

        // Compare old attributes with new ones
        foreach ($data as $key => $newValue) {
            if (array_key_exists($key, $oldAttributes) && $oldAttributes[$key] != $newValue) {
                // Skip the updated_at field
                if ($key !== 'updated_at') {
                    $changes[$key] = [
                        'From' => $oldAttributes[$key],
                        'To' => $newValue,
                    ];
                }
            }
        }

        // Get the purchased_no (PO number) from the updated data
        $clientName = $customerRating->clientName;

        $activity = [
            'message' => "Client Information: $clientName",
            'changes' => $changes, // $changes is already an array
        ];

        Usersystemlog::create([
            "user_id" => $userId,
            "user_email" => $userEmail,
            "user_ip" => $userIp,
            "activities" => json_encode($activity),
            "action" => $actions,
            "module" => $moduleId,
        ]);

        $companyName = $customerRating->companyName;
        $data = $request->validated();
        $data['updated_at'] = Carbon::now();
        $customerRating->update($data);

        return to_route('ratingdata.index')->with(['success' => "Client Info \"$companyName\" updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($clientId)
    {
        $customerRating = CustomerRating::findOrFail($clientId);
        $companyName = $customerRating->companyName;
        $customerRating->delete();
        return to_route('ratingdata.index')->with(['success', "Client Info \"$companyName\" deleted Successfully!"]);
    }

    public function export_csv(Request $request)
    {
        // Initialize query
        $query = CustomerRating::query();

        // Filter by date
        if ($request->filled('dateFrom') && $request->filled('dateTo')) {
            try {
                $dateFrom = Carbon::createFromFormat('Y-m-d', $request->input('dateFrom'))->startOfDay();
                $dateTo = Carbon::createFromFormat('Y-m-d', $request->input('dateTo'))->endOfDay();
                $query->whereBetween('created_at', [$dateFrom, $dateTo]);
            } catch (\Exception $e) {
                return response()->json(['error' => 'Invalid date format. Please use YYYY-MM-DD.'], 400);
            }
        }

        // Filter by sex and rating
        if ($request->filled('sex')) {
            $query->where('sex', $request->input('sex'));
        }
        if ($request->filled('rating')) {
            $query->where('rating', $request->input('rating'));
        }

        $data = $query->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'No data found for the given filters.'], 404);
        }

        // CSV headers
        $headers = [
            'Content-type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename=helpdesk_report.csv',
            'Pragma'              => 'no-cache',
            'Cache-Control'       => 'must-revalidate, post-check=0, pre-check=0',
            'Expires'             => '0',
        ];

        // Define CSV content
        $columns = [
            'Officer of the Day (Name)',
            'Date',
            'Client Name',
            'Sex',
            'Sector',
            'Company Name',
            'Address',
            'Contact Number',
            'Email',
            'Time In',
            'Time Out',
            'Response Time',
            'Transaction Type',
            'Section',
            'Personnel',
            'Rating',
            'Comments/Suggestions',
        ];


        $callback = function () use ($data, $columns, $request) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($data as $row) {
                $createdAt = new DateTime($row->timeIn);
                $updatedAt = new DateTime($row->timeOut);
                $interval = $updatedAt->diff($createdAt);

                // Format as HH:MM:SS
                $duration = sprintf(
                    '%02d:%02d:%02d',
                    ($interval->days * 24) + $interval->h, // total hours including days
                    $interval->i,
                    $interval->s
                );

                $rowData = [
                    $row->odName,
                    $row->date,
                    $row->clientName,
                    $row->sex,
                    $row->sector,
                    $row->companyName,
                    $row->address,
                    $row->contactNumber,
                    $row->email,
                    $row->timeIn,
                    $row->timeOut,
                    $duration,
                    $row->transactionType,
                    $row->unitVisited,
                    $row->personnel,
                    $row->rating,
                    $row->comments,
                ];
                fputcsv($file, $rowData);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}
