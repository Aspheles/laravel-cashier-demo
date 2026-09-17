<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Show the home page.
     */
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'plans' => $this->mockPlans(),
        ]);
    }

    /**
     * @return list<array{id: string, name: string, description: string, price: int, interval: string, features: list<string>, highlighted: bool}>
     */
    private function mockPlans(): array
    {
        return [
            [
                'id' => 'starter',
                'name' => 'Starter',
                'description' => 'For solo projects getting off the ground.',
                'price' => 900,
                'interval' => 'month',
                'features' => [
                    '1 active subscription',
                    'Pay.nl checkout',
                    'Email support',
                ],
                'highlighted' => false,
            ],
            [
                'id' => 'growth',
                'name' => 'Growth',
                'description' => 'For teams that need recurring billing at scale.',
                'price' => 2900,
                'interval' => 'month',
                'features' => [
                    'Unlimited subscriptions',
                    'Pay.nl checkout',
                    'Webhooks & invoices',
                    'Priority support',
                ],
                'highlighted' => true,
            ],
            [
                'id' => 'enterprise',
                'name' => 'Enterprise',
                'description' => 'For organizations with custom requirements.',
                'price' => 9900,
                'interval' => 'month',
                'features' => [
                    'Unlimited subscriptions',
                    'Pay.nl checkout',
                    'Webhooks & invoices',
                    'Dedicated account manager',
                ],
                'highlighted' => false,
            ],
        ];
    }
}
