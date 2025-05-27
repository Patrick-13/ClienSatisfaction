<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Resources\EmployeeResource;
use App\Models\Division;
use App\Models\Section;
use App\Models\Unit;
use Carbon\Carbon;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Employee::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "desc");

        if (request('searchemployee')) {
            $query->when(request('searchemployee'), function ($q, $search) {
                $q->where(function ($q) use ($search) {
                    $q->where('embId', 'like', '%' . $search . '%')
                        ->orWhere('fullName', 'like', '%' . $search . '%');
                });
            });
        }

        $employees = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        $employees->appends(request()->only(['searchemployee', 'page', 'sort_field', 'sort_direction']));

        $totalCount = $employees->total();

        // Get the count of positions being displayed on the current page
        $currentPageCount = $employees->count();
        $currentPage = $employees->currentPage();


        $divisions = Division::orderBy('division_name', 'asc')->get();
        $sections = Section::orderBy('section_name', 'asc')->get();
        $units = Unit::orderBy('unit_name', 'asc')->get();

        return inertia("Employee/Index", [
            "employees" => EmployeeResource::collection($employees),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'totalCount' => $totalCount,
            'currentPageCount' => $currentPageCount,
            'currentPage' => $currentPage,
            'divisions' => $divisions,
            'sections' => $sections,
            'units' => $units,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        $data = $request->validated();

        Employee::create($data);

        return to_route('employee.index')->with(['success' => 'Officer Schedule Successfully created!']);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return new EmployeeResource($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $data = $request->validated();
        $fullName = $employee->fullName;
        $data['updated_at'] = Carbon::now();
        $employee->update($data);

        return to_route('employee.index')->with(['success' => "Employee \"$fullName\" updated successfully"]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $fullName = $employee->fullName;
        $employee->delete();

        return to_route('employee.index')->with(['success' => "Employee \"$fullName\" was deleted Successfully!"]); //
    }


    public function import_employee(Request $request)
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


                $divisionName = $row[5];
                $division = Division::where('division_name', 'like', '%' . $divisionName . '%')->first();
                $divisionId = $division ? $division->id : null;

                $sectionName = $row[6];
                $section = Section::where('section_name', 'like', '%' . $sectionName . '%')->first();
                $sectionId = $section ? $section->id : null;

                $unitName = $row[7];
                $unit = Unit::where('unit_name',  $unitName)->first();
                $unitId = $unit ? $unit->id : null;

                // Assign parts to corresponding keys
                $employeeData = [
                    'embId' => $row[0],
                    'date_registered' => $row[1],
                    'fullName' => $row[2],
                    'designation' => $row[3],
                    'email' => $row[4],
                    'division_id' => $divisionId,
                    'section_id' => $sectionId,
                    'unit_id' => $unitId,
                ];

                // Check if employee already exists
                $existingEmployee = Employee::where('embId', $row[0])->first();

                if ($existingEmployee) {
                    // Update existing employee
                    $existingEmployee->update($employeeData);
                } else {
                    // Create new employee
                    Employee::create($employeeData);
                }
            }
        }

        return to_route('employee.index')->with(['success', "Employee data has been successfully imported."]);
    }
}
