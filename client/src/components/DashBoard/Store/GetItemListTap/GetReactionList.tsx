import { css } from '@emotion/react';
import { useState, useCallback, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import member, {
  setPoint,
  saveMember,
  allItems,
  Items,
  saveItem,
} from '@src/store/member';

function Item({ item }) {
  const img = '/items/' + item.name + '.gif';
  return (
    <div className="item-div">
      <img src={img} style={{ width: '80px' }} />
      <p>{item.name}</p>
    </div>
  );
}

const GetReactionList = () => {
  const [items, setItems] = useState<Items[]>([allItems]);
  const memberStore = useAppSelector((state) => state.member);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //로딩시 해당 유저의 아이템 불러오기
    dispatch(saveItem(memberStore.userId)).then(() => {
      setItems(memberStore.items);
      dispatch(saveMember());
      console.log('-------랜더링 : ', items);
    });
  }, []);

  const filterItem = items.filter(
    (item) =>
      item.category !== undefined &&
      item.category === 'REACTION' &&
      item.cnt !== undefined &&
      item.cnt > 0,
  );

  // console.log(items);

  return (
    <div css={totalContainer}>
      {filterItem.map((item, index) => (
        <Item key={index} item={item} />
      ))}
    </div>
  );
};

const totalContainer = () => css`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: start;
  padding: 10px;

  .item-div {
    width: 105px;
    width: 100px;
    height: 100px;
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

    :hover {
      transform: scale(1.05);
      cursor: pointer;
    }

    p {
      font-size: calc(0.5vw);
    }
  }
`;

export default GetReactionList;
