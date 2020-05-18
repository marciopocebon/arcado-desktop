import React, { useEffect, useState } from 'react';
import api from '../../shared/services/api';
import { message } from 'antd';
import local_rooms from '../../shared/utils/rooms.json';
import GameModel from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageRoomsItem } from './GameDetailsPageRoomsItem';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageRooms: React.FC<ContainerProps> = ({ game }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const { result } = await api.getRooms(game.id);
        setRooms(result);
        setLoading(false);
      } catch (e) {
        message.error('can not load rooms')
        setRooms(local_rooms);
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex-c ffm-bold mb25 fc-black fs-s">
        <span className="w40">Name</span>
        <span className="w20">Bet (LSK)</span>
        <span className="w20">Players</span>
      </div>
      {
        rooms.map(
          (room, index) =>
            <GameDetailsPageRoomsItem
              gameId={game.id}
              room={room}
              isLastChild={index === rooms.length - 1}
            />
        )
      }
    </div>
  )
}