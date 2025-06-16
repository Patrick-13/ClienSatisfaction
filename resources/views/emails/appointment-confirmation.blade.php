<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
        }

        h1 {
            color: #333;
        }

        .ticket-details {
            border: 1px solid #ddd;
            padding: 10px;
            margin-top: 10px;
        }

        .ticket-details p {
            margin: 5px 0;
        }
    </style>
</head>

<body>

    <p>Dear {{ $appointment->fullname ?? 'Client' }},</p>

    <p><strong>Appointment Number:</strong> {{ $appointment->appointmentNumber }}</p>
    <p><strong>Date:</strong> {{ $appointment->date }}</p>
    <p><strong>Time:</strong> {{ $appointment->time }}</p>

    <p>Thank you for booking your appointment!</p>

    <p>We look forward to seeing you!</p>
</body>

</html>