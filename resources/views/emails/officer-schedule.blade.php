<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Officer Scheduled Today</title>
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
    <h1>Officer Schedule Today</h1>

    <p><strong>Name:</strong> {{ $schedule['odName'] }}</p>
    <p><strong>Date:</strong> {{ $schedule['date'] }}</p>
    <p><strong>Time:</strong> {{ $schedule['timeStart'] }} - {{ $schedule['timeEnd'] }}</p>
    <p><strong>Email:</strong> {{ $schedule['email'] }}</p>
    <p><strong>Remarks:</strong> {{ $schedule['remarks'] }}</p>
</body>

</html>