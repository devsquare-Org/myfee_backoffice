type Props = {
  params: {
    bannerId: string;
  };
};

export default function BannerDetail({ params }: Props) {
  const { bannerId } = params;

  return <div>BannerDetail {bannerId}</div>;
}
