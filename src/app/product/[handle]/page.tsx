import { redirect } from 'next/navigation';

export default async function LegacyProductRoute({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  redirect(`/products/${handle}`);
}
