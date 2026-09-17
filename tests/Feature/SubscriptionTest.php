<?php

use App\Models\User;

test('guests are redirected to the login page when subscribing', function () {
    $response = $this->post(route('subscriptions.store'), ['plan' => 'growth']);

    $response->assertRedirect(route('login'));
});

test('authenticated users can subscribe and land on the success page', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('subscriptions.store'), ['plan' => 'growth']);

    $response->assertRedirect(route('subscriptions.success', ['plan' => 'growth']));

    $this->assertDatabaseHas('subscriptions', [
        'owner_type' => $user->getMorphClass(),
        'owner_id' => (string) $user->getKey(),
        'type' => 'default',
        'plan' => 'growth',
    ]);
});

test('subscribing to an unknown plan is rejected', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->post(route('subscriptions.store'), ['plan' => 'not-a-plan']);

    $response->assertInvalid('plan');
});

test('the success page shows the plan name', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('subscriptions.success', ['plan' => 'growth']));

    $response->assertOk();
});
