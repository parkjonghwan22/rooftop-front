import { NFTOnSale } from '@components/collection/nftonsale';
import { RootLayout } from '@components/layout/layout';
import { useRouter } from 'next/router';


const NftPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <RootLayout>
      <p>NFT ID: {id}</p>
      <NFTOnSale />
    </RootLayout>
  );
}

export default NftPage