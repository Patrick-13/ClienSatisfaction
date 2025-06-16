<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Jobs\SendEmailAppointment;
use App\Mail\AppointmentConfirmationMail;
use App\Models\Appointment;
use App\Models\Loginlog;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Dompdf\Dompdf;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    //
    public function index()
    {
        $sortField = request("sort_field", "date");
        $sortDirection = request("sort_direction", "desc");

        $query = Appointment::query();

        // If no search, limit to today's date
        if (!request('searchclient')) {
            $query->where('date', today());
        }

        // Search logic
        if (request('searchclient')) {
            $search = request('searchclient');
            $query->where(function ($q) use ($search) {
                $q->where('appointmentNumber', $search)
                    ->orWhere('fullname', 'like', '%' . $search . '%');
            });
        }

        $appointments = $query->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->onEachSide(1);

        $appointments->appends(request()->only(['searchclient', 'page', 'sort_field', 'sort_direction']));

        return inertia("Appointment/Index", [
            "appointments" => AppointmentResource::collection($appointments),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
            'totalCount' => $appointments->total(),
            'currentPageCount' => $appointments->count(),
            'currentPage' => $appointments->currentPage(),
        ]);
    }


    public function index_appointment()
    {
        return inertia("Appointment", [
            'success' => session('success'),
        ]);
    }

    public function checkAppointmentNumberExists($appointmentnumber)
    {
        $appNumber = Appointment::where('appointmentNumber', $appointmentnumber)->first();
        return response()->json(['exists' => !!$appNumber]);
    }


    public function store(StoreAppointmentRequest $request)
    {
        $data = $request->validated();
        $data['appointmentNumber'] = $this->generateUniqueAppointmentNumber();

        $appointment = Appointment::create($data);

        Mail::to($appointment->email)->send(new AppointmentConfirmationMail($appointment));

        return redirect()->route('appointment')->with([
            'success' => 'Client has Successfully created appointment!',
        ]);
    }

    public function show() {}

    private function generateUniqueAppointmentNumber()
    {
        do {
            $number = 'APP-' . now()->format('Ymd') . '-' . rand(100000, 999999);
        } while (Appointment::where('appointmentNumber', $number)->exists());

        return $number;
    }


    public function export_pdf()
    {

        $user = auth()->user();

        $latestLogin = Loginlog::where('user_id', $user->id)
            ->whereDate('created_at', today()) // Only today's records
            ->orderBy('created_at', 'asc')     // Earliest first
            ->first();

        $loginTime = $latestLogin ? Carbon::parse($latestLogin->created_at)->format('F j, Y h:i A') : 'N/A';
        // Initialize query
        $query = Appointment::where('date', today());

        $data = $query->get();

        if ($data->isEmpty()) {
            return response()->json(['message' => 'No data found for the given filters.'], 404);
        }

        // Create PDF content
        $dompdf = new Dompdf();
        $html = '<html><head><style>';
        $html .= 'table { border-collapse: collapse; width: 100%; }';
        $html .= 'th, td { border: 1px solid #dddddd; text-align: left; padding: 8px; font-size: 10px;}';
        $html .= 'th { background-color: #f2f2f2; }';
        $html .= 'thead { display: table-header-group; }';
        $html .= '.container { display: flex; justify-content: space-between; }';
        $html .= '.column { width: 48%; }'; // Adjust width to fit two columns
        $html .= '</style></head><body>';

        $html .= '<h1 style="text-align:center;">DENR - EMB</h1>';
        $html .= '<h1 style="text-align:center;">OD Accomplishment Report</h1>';
        $html .= '<p><strong>Login Time:</strong> ' . Carbon::parse($loginTime)->format('F j, Y h:i A') . '</p>';

        // Display employee details in two columns
        $html .= '<div class="container">';
        $html .= '<div class="column">';
        $html .= '</div>';
        $html .= '<div class="column"></div>'; // Empty column for spacing if needed
        $html .= '</div>';

        // Table with punch data
        $html .= '<table>';
        $html .= '<thead><tr>
        <th>Appointment #</th>
        <th>Date</th>
        <th>Time</th>
        <th>Client`s Fullname</th>
        <th>Company Name</th>
        </tr></thead>';
        $html .= '<tbody>';

        $count = 0; // Initialize ticket count

        foreach ($data as $row) {

            $html .= '<tr>
            <td>' . $row->appointmentNumber . '</td>
            <td>' . $row->date . '</td>
            <td>' . $row->time . '</td>
            <td>' . $row->fullname . '</td>
            <td>' . $row->company . '</td>
            </tr>';
        }
        $appointmentcount = count($data);
        $html .= '<tfoot>
        <tr>
        <td colspan="5" style="text-align: left;">Appointment Count: ' . $appointmentcount . '</td>
        </tr>
    </tfoot>';

        $html .= '</tbody>';
        $html .= '</table>';

        // Signatures section
        $html .= '<div style="margin-top: 60px; text-align: center;">';
        $html .= '<div style="display: flex; justify-content: space-between;">';
        $html .= '<div style="text-align: left; width: 48%;">';
        $html .= '<div>Prepared by:</div>';
        $html .= '<div style="border-bottom: 1px solid black; width: 200px; margin-top: 50px;"></div>';
        $html .= '<div style="margin-top: 5px; margin-left: 15px;">Printed Name & Signature</div>';
        $html .= '</div>';
        $html .= '</div>';
        $html .= '</body></html>';

        $dompdf->loadHtml($html);
        $dompdf->setPaper('a4', 'landscape');
        $dompdf->render();

        return response($dompdf->output(), 200)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', 'inline; filename="od_accomplishment_report.pdf"');
    }
}
