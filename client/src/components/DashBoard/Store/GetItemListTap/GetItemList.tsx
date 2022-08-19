import { css } from '@emotion/react';
import { useState, useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

import member, {
  setPoint,
  saveMember,
  allItems,
  Items,
  saveItem,
} from '@src/store/member';

interface GetItemListProps {
  highFunction: Function;
}

const GetItemList = (props: GetItemListProps) => {
  // const { items } = props;
  const [items, setItems] = useState<Items[]>([allItems]);
  const [loading, setLoading] = useState(true);
  const memberStore = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [border, setBorder] = useState(props);

  useEffect(() => {
    //로딩시 해당 유저의 아이템 불러오기
    dispatch(saveItem(memberStore.userId)).then(() => {
      setItems(memberStore.items);
      dispatch(saveMember());
      setLoading(false);
    });
  }, []);

  const customId = 'custom-id-yes';

  function Item({ item }) {
    const img = '/items/' + item.itemId + '.png';

    const onClickItem = (e) => {
      if (e.itemId > 2) {
        toast.warn('해당 아이템은 수업 중 사용이 가능합니다.', {
          toastId: customId,
        });
      } else if (confirm(e.name + '을 사용하시겠습니까?')) {
        //색상 랜덤 뽑기
        //색상 1, 2-3, 4-8
        //색상 확률 1, 9, 90
        let color = 0;
        const rarity = Math.floor(Math.random() * 100) + 1; //1~100까지
        if (rarity >= 10) {
          color = Math.floor(Math.random() * 5) + 4;
        } else if (rarity >= 2) {
          color = Math.floor(Math.random() * 2) + 2;
        } else {
          color = 1;
        }

        InterceptedAxios.delete(`/items/${memberStore.userId}/${e.itemId}`)
          .then(() => {
            //테두리
            if (e.itemId === 1) {
              InterceptedAxios.patch('/items/color/border', {
                studentId: memberStore.userId,
                color: color,
              })
                .then(() => {
                  props.highFunction(color, 1);
                })
                .catch(function (error) {
                  toast.warn('테두리 컬러뽑기 중 에러 발생');
                  console.log(error);
                });
            } else {
              //퐁퐁이 참여도
              InterceptedAxios.patch('/items/color/jandi', {
                studentId: memberStore.userId,
                color: color,
              })
                .then(() => {
                  props.highFunction(color, 2);
                })
                .catch(function (error) {
                  toast.warn('퐁퐁이 컬러뽑기 중 에러 발생');
                  console.log(error);
                });
            }
          })
          .catch(function (error) {
            toast.warn('아이템 사용 중 에러 발생');
            console.log(error);
          });
      }
    };

    return (
      <div
        className="colorchangeBorder"
        onClick={(e) => {
          onClickItem(item);
        }}
      >
        <img src={img} style={{ width: '80%' }} />
        <p>
          {item.name}:{item.cnt}
        </p>
      </div>
    );
  }

  // console.log(items, ',,');
  const filterItem = items.filter(
    (item) =>
      item.category !== undefined &&
      item.category !== 'REACTION' &&
      item.cnt !== undefined &&
      item.cnt > 0,
  );

  const render = () => {
    return filterItem.map((item, index) => <Item key={index} item={item} />);
  };

  return <div css={totalContainer}>{loading ? null : render()}</div>;
};

const totalContainer = () => css`
  padding: 10px;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: start;

  .colorchangeBorder {
    width: calc(80% / 4);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 2px 2px 8px -5px;
    transition: all 0.1s ease-in-out;
    margin: 10px;
    border: 1px solid lightgray;
    padding: 4px;
    p {
      font-size: 0.8vw;
      margin-bottom: 0px;
    }

    :hover {
      transform: scale(1.05);
      cursor: pointer;
    }
  }
`;

export default GetItemList;
