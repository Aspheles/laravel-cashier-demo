<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Start a new subscription for the authenticated user and send them to the success page.
     *
     * ponytail: no live PAY.nl checkout yet, so we skip $checkout->redirectUrl() (a
     * placeholder external URL) and land the user straight on the success page. Once
     * paynl/sdk's OrderCreate is wired in, swap this for a real redirect to checkout and
     * only show success after the payment callback confirms it.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'plan' => ['required', 'string', Rule::in(['starter', 'growth', 'enterprise'])],
        ]);

        $request->user()->newSubscription($validated['plan']);

        return to_route('subscriptions.success', ['plan' => $validated['plan']]);
    }

    /**
     * Show the "you're subscribed" confirmation page.
     */
    public function success(Request $request): Response
    {
        $plan = $request->query('plan');

        return Inertia::render('subscriptions/success', [
            'plan' => is_string($plan) ? ucfirst($plan) : null,
        ]);
    }
}
