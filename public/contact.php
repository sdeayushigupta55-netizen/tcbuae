<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  echo json_encode(["success" => false, "message" => "Only POST allowed"]);
  exit;
}

require __DIR__ . "/contact-mail.php";

function clean($v) {
  return htmlspecialchars(trim($v ?? ""), ENT_QUOTES, "UTF-8");
}

$name = clean($_POST["name"] ?? "");
$email = clean($_POST["email"] ?? "");
$phone = clean($_POST["phone"] ?? "");
$service = clean($_POST["service"] ?? "");
$message = clean($_POST["message"] ?? "");

if ($name === "" || $email === "" || $message === "") {
  echo json_encode(["success" => false, "message" => "Name, email, message required"]);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  echo json_encode(["success" => false, "message" => "Invalid email"]);
  exit;
}

$config = contact_mail_config();
$subject = "New Contact Request - " . ($service !== "" ? $service : "General");

$body = "New Contact Form Submission\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Phone: " . ($phone !== "" ? $phone : "N/A") . "\n";
$body .= "Service: " . ($service !== "" ? $service : "N/A") . "\n\n";
$body .= "Message:\n$message\n";

$result = contact_send($config, [
  'subject' => $subject,
  'body' => $body,
  'reply_to' => $email,
  'name' => $name,
  'phone' => $phone,
  'service' => $service,
  'user_message' => $message,
]);

echo json_encode($result);
