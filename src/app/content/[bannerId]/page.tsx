type Props = {
  params: Promise<{
    bannerId: string;
  }>;
};

export default async function BannerDetail({ params }: Props) {
  const { bannerId } = await params;

  return <div>BannerDetail {bannerId}</div>;
}
