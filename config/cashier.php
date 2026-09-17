<?php

// config for Paynl/LaravelCashier
return [
    'PAY_KEY' => env('PAY_KEY'),

    // ponytail: placeholder until a real paynl/sdk OrderCreate call replaces it with the actual payment URL.
    'checkout_url' => env('PAY_CHECKOUT_URL', 'https://checkout.pay.nl'),
];
