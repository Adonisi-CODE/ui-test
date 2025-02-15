import React from 'react';
import { Alert } from '@/components/Alert/Alert';
import { MultiSelect } from '@/components/MultiSelect/MultiSelect';

export default function Home() {
    return (
        <main className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <h1 className="text-3xl font-bold mb-6">
                Teamboks UI Technical Assessment
            </h1>

            {/* ALERT DEMO */}
            <section className="space-y-4 mb-10">
                <Alert type="success">
                    Operation completed successfully!
                </Alert>
                <Alert
                    type="warning"
                    title="Update Available"
                    description="A new version is ready to install."
                />
                <Alert
                    type="info"
                    variant="subtle"
                    onClose={() => alert('Alert closed')}
                >
                    Custom content here with an optional close button.
                </Alert>
                <Alert
                    type="error"
                    description="There was an error processing your request."
                />
            </section>

            {/* MULTISELECT DEMO */}
            <section className="max-w-md">
                <MultiSelect
                    options={async () => [
                        { label: 'Alpha', value: 'alpha' },
                        { label: 'Beta', value: 'beta' },
                        { label: 'Gamma', value: 'gamma' },
                    ]}
                    placeholder="Pick your favorite options..."
                    defaultValues={['beta']}
                    clearable
                    searchable
                    onChange={(selected) => console.log('Selected:', selected)}
                />
            </section>
        </main>
    );
}
