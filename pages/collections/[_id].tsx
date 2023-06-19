import { useRouter } from 'next/router';
import { RootLayout } from "@components/layout/layout"
import { useEffect } from 'react';


const CollectionPage = () => {
  const router = useRouter();
  const { _id, ca } = router.query;

  useEffect(() => {
    // 페이지가 로드될 때 또는 _id가 변경될 때 실행되는 코드 작성 가능
    // _id를 사용하여 컬렉션 데이터를 가져올 수 있음
  }, [_id]);

  return (
    <RootLayout>
        <p>Collection ID, CA: {_id} {ca}</p>
        {/* 페이지 내용 및 컴포넌트 */}
    </RootLayout>
  );
};

export default CollectionPage;