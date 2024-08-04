<?php
/**
 * /-------------------------------
 * |
 * |    fill $_ENV with .env file
 * |
 * \------------------------------
 */ 
$envFile =  __DIR__ . '/.env.local';
// if i'm on host ".com.ar"
if (strpos($_SERVER['HTTP_HOST'], '.com.ar') !== false) 
    $envFile =  __DIR__ . '/.env';
    
foreach (file($envFile) as $line) {
    $_ENV[ explode("=",trim($line) )[0] ] = explode("=",trim($line))[1];
}