import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';
import { RoomDetailsPageHeader } from './RoomDetailsPageHeader';
import { RoomModel } from '../../models/room.model';
import { getPlayers, getRoom } from '../../utils/api/rooms';
import { message } from 'antd';
import { RoomDetailsPageParticipants } from './RoomDetailsPageParticipants';
import { PageNavigation } from '../../components/PageNavigation';
import { getGame } from '../../utils/api/games';
import { RoomDetailsPagePrizeDistribution } from './RoomDetailsPagePrizeDistribution';
//import { isArrayWithElements } from '../../utils/utils/type-checking';

const menu = [
  'Participants'
]

interface MatchParams {
  roomId: string;
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const RoomDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [room, setRoom] = useState<RoomModel>(undefined);
  const [page, setPage] = useState<string>(menu[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const { gameId, roomId } = match.params;

  async function getRoomDetails () {
    try {
      const [room, { game }] = await Promise.all([
        getRoom(roomId),
        getGame(gameId),
        getPlayers(roomId)
      ])
      room.game = game;
      setRoom(room);
      setLoading(false);
    }catch (e) {
      message.error('Can not fetch room');
      setLoading(false);
    }
  }

  useEffect( () => {
    window.scrollTo(0, 0)
    return () => ''
  }, []);

  useEffect( () => {
    getRoomDetails();
    return () => ''
  }, [gameId, roomId]);

  async function refresh () {
    await setLoading(true);
    getRoomDetails();
  }

  if(loading) {
    return <Loading />
  }

  return (
    <div className="grid mt75">
      <RoomDetailsPageHeader
        refresh={refresh}
        room={room}
      />
      <RoomDetailsPagePrizeDistribution room={room} />
      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={(page) => setPage(page)}
      />
      <RoomDetailsPageParticipants
        addresses={[]}
      />
    </div>
  )
}
