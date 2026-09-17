import { Head, Link } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';
import { home } from '@/routes';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function SubscriptionSuccess({ plan }: { plan: string | null }) {
    return (
        <>
            <Head title="Subscribed" />
            <main className="flex w-full max-w-5xl flex-1 items-center justify-center">
                <Card className="w-full max-w-md text-center">
                    <CardHeader>
                        <CheckCircle2 className="text-primary mx-auto size-12" />
                        <CardTitle className="text-2xl">
                            Congratulations!
                        </CardTitle>
                        <CardDescription>
                            {plan
                                ? `You've subscribed to the ${plan} plan.`
                                : "You've started a subscription."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full">
                            <Link href={home()}>Back to home</Link>
                        </Button>
                    </CardContent>
                </Card>
            </main>
        </>
    );
}
