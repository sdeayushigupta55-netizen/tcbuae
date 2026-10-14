<?php

function contact_mail_config(): array {
  $defaults = [
    'to' => 'support@tcbuae.com',
    'from_email' => 'support@tcbuae.com',
    'from_name' => 'TCB Website',
  ];
  $path = __DIR__ . '/contact.config.php';
  if (is_readable($path)) {
    $custom = require $path;
    if (is_array($custom)) {
      $defaults = array_merge($defaults, $custom);
    }
  }

  $envPassword = getenv('CONTACT_SMTP_PASSWORD');
  if ($envPassword !== false && $envPassword !== '') {
    $defaults['smtp'] = array_merge($defaults['smtp'] ?? [], ['password' => $envPassword]);
  }
  $envHost = getenv('CONTACT_SMTP_HOST');
  if ($envHost !== false && $envHost !== '') {
    $defaults['smtp'] = array_merge($defaults['smtp'] ?? [], ['host' => $envHost]);
  }

  return $defaults;
}

function contact_is_local_request(): bool {
  $addr = $_SERVER['REMOTE_ADDR'] ?? '';
  return in_array($addr, ['127.0.0.1', '::1'], true);
}

function contact_dev_log(array $payload): bool {
  $path = dirname(__DIR__) . '/.contact-dev.log';
  $line = json_encode([
    'time' => gmdate('c'),
    ...$payload,
  ], JSON_UNESCAPED_UNICODE) . "\n";
  return file_put_contents($path, $line, FILE_APPEND | LOCK_EX) !== false;
}

function contact_smtp_read($fp): string {
  $data = '';
  while ($line = fgets($fp, 515)) {
    $data .= $line;
    if (isset($line[3]) && $line[3] === ' ') {
      break;
    }
  }
  return $data;
}

function contact_smtp_cmd($fp, string $cmd, array $expectCodes): void {
  if ($cmd !== '') {
    fwrite($fp, $cmd . "\r\n");
  }
  $resp = contact_smtp_read($fp);
  $code = (int) substr($resp, 0, 3);
  if (!in_array($code, $expectCodes, true)) {
    throw new RuntimeException('SMTP error: ' . trim($resp));
  }
}

function contact_send_smtp(array $config, string $to, string $subject, string $body, string $replyTo): void {
  $smtp = $config['smtp'] ?? null;
  if (!is_array($smtp) || empty($smtp['host']) || empty($smtp['username']) || !array_key_exists('password', $smtp)) {
    throw new RuntimeException('SMTP not configured');
  }

  $host = $smtp['host'];
  $port = (int) ($smtp['port'] ?? 587);
  $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
  $from = $config['from_email'];
  $fromName = $config['from_name'] ?? '';

  $remote = ($encryption === 'ssl' ? 'ssl://' : 'tcp://') . $host . ':' . $port;
  $fp = @stream_socket_client($remote, $errno, $errstr, 20, STREAM_CLIENT_CONNECT);
  if (!$fp) {
    throw new RuntimeException("SMTP connect failed: $errstr ($errno)");
  }
  stream_set_timeout($fp, 20);

  contact_smtp_read($fp);
  contact_smtp_cmd($fp, 'EHLO localhost', [250]);

  if ($encryption === 'tls') {
    contact_smtp_cmd($fp, 'STARTTLS', [220]);
    if (!stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
      throw new RuntimeException('SMTP STARTTLS failed');
    }
    contact_smtp_cmd($fp, 'EHLO localhost', [250]);
  }

  contact_smtp_cmd($fp, 'AUTH LOGIN', [334]);
  contact_smtp_cmd($fp, base64_encode($smtp['username']), [334]);
  contact_smtp_cmd($fp, base64_encode((string) $smtp['password']), [235]);

  contact_smtp_cmd($fp, "MAIL FROM:<$from>", [250]);
  contact_smtp_cmd($fp, "RCPT TO:<$to>", [250, 251]);
  contact_smtp_cmd($fp, 'DATA', [354]);

  $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
  $fromHeader = $fromName !== ''
    ? '=?UTF-8?B?' . base64_encode($fromName) . '?= <' . $from . '>'
    : $from;

  $message = "From: $fromHeader\r\n";
  $message .= "To: <$to>\r\n";
  $message .= "Reply-To: <$replyTo>\r\n";
  $message .= "Subject: $encodedSubject\r\n";
  $message .= "MIME-Version: 1.0\r\n";
  $message .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $message .= "Content-Transfer-Encoding: 8bit\r\n";
  $message .= "\r\n";
  $message .= str_replace("\n.", "\n..", str_replace("\r\n", "\n", $body));
  $message = str_replace("\n", "\r\n", $message);
  $message .= "\r\n.\r\n";

  fwrite($fp, $message);
  $dataResp = contact_smtp_read($fp);
  $dataCode = (int) substr($dataResp, 0, 3);
  if ($dataCode !== 250) {
    throw new RuntimeException('SMTP DATA failed: ' . trim($dataResp));
  }
  contact_smtp_cmd($fp, 'QUIT', [221]);
  fclose($fp);
}

function contact_send_mail(array $config, string $to, string $subject, string $body, string $replyTo): bool {
  $from = $config['from_email'];
  $headers = "From: $from\r\n";
  $headers .= "Reply-To: $replyTo\r\n";
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
  return @mail($to, $subject, $body, $headers);
}

function contact_send(array $config, array $fields): array {
  $to = $config['to'];
  $subject = $fields['subject'];
  $body = $fields['body'];
  $replyTo = $fields['reply_to'];

  try {
    if (!empty($config['smtp']['host'])) {
      contact_send_smtp($config, $to, $subject, $body, $replyTo);
      return ['success' => true, 'message' => 'Email sent'];
    }
  } catch (Throwable $e) {
    if (!contact_is_local_request()) {
      return ['success' => false, 'message' => 'SMTP failed: ' . $e->getMessage()];
    }
  }

  if (contact_send_mail($config, $to, $subject, $body, $replyTo)) {
    return ['success' => true, 'message' => 'Email sent'];
  }

  if (contact_is_local_request()) {
    $logged = contact_dev_log([
      'to' => $to,
      'subject' => $subject,
      'name' => $fields['name'],
      'email' => $fields['reply_to'],
      'phone' => $fields['phone'],
      'service' => $fields['service'],
      'message' => $fields['user_message'],
    ]);
    if ($logged) {
      return [
        'success' => true,
        'message' => 'dev_log',
      ];
    }
  }

  return [
    'success' => false,
    'message' => 'Could not send email. Copy public/contact.config.php.example to contact.config.php and add your host SMTP settings (cPanel / mailbox password).',
  ];
}
