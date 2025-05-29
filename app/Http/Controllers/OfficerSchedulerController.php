<?php

namespace App\Http\Controllers;

use App\Models\OfficerScheduler;
use App\Http\Requests\StoreOfficerSchedulerRequest;
use App\Http\Requests\UpdateOfficerSchedulerRequest;
use App\Http\Resources\OfficerScheduleResource;
use Illuminate\Http\Request;

class OfficerSchedulerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $query = OfficerScheduler::query();

        $officerschedules = $query->get();

        return inertia("OfficerSchedule/Index", [
            "officerschedules" => OfficerScheduleResource::collection($officerschedules),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOfficerSchedulerRequest $request)
    {

        $schedule = $request->validated();

        OfficerScheduler::create($schedule);

        return to_route('officerschedule.index')->with(['success' => 'Officer Schedule Successfully created!']);
    }


    /**
     * Download csv file .
     */
    public function export_csv(Request $request)
    {
        // Initialize query
        $query = OfficerScheduler::query();

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
            'Time Start',
            'Time End',
            'Email',
            'Remarks',
        ];

        $callback = function () use ($data, $columns, $request) {
            $file = fopen('php://output', 'w');
            fputcsv($file, $columns);

            foreach ($data as $row) {
                $rowData = [
                    $row->odName,
                    $row->date,
                    $row->timeStart,
                    $row->timeEnd,
                    $row->email,
                    $row->remarks,
                ];
                fputcsv($file, $rowData);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    public function import_csv(Request $request)
    {
        // Initialize queries
        $isFirstRow = true;
        if ($request->hasFile('dtr_file')) {
            $file = $request->file('dtr_file');
            $filePath = $file->getRealPath();

            $data = array_map('str_getcsv', file($filePath));

            foreach ($data as $row) {

                if ($isFirstRow) {
                    $isFirstRow = false;
                    continue;
                }

                // Assign parts to corresponding keys
                $employeeData = [
                    'odName' => $row[0],
                    'date' => $row[1],
                    'timeStart' => $row[2],
                    'timeEnd' => $row[3],
                    'email' => $row[4],
                    'remarks' => $row[5],
                ];

                // Check if employee already exists
                $existingEmployee = OfficerScheduler::where('odName', $row[0])->first();

                if ($existingEmployee) {
                    // Update existing employee
                    $existingEmployee->update($employeeData);
                } else {
                    // Create new employee
                    OfficerScheduler::create($employeeData);
                }
            }
        }

        return to_route('officerschedule.index')->with(['success', "Employee Schedule data has been successfully imported."]);
    }
}
