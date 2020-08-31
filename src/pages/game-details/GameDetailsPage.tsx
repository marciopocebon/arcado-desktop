import React, { useEffect, useState } from 'react';
import { GameModel } from '../../models/game.model';
import { getGame } from '../../utils/api/games';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { GameDetailsPageHeader } from './GameDetailsPageHeader';
import { GameDetailsPageRooms } from './GameDetailsPageRooms';

interface MatchParams {
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

const menu = ['Tournaments'];

export const GameDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [page, setPage] = useState<string>(menu[0])
  const [game, setGame] = useState<GameModel>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const { gameId } = match.params

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  useEffect( () => {
    async function fetchData() {
      try {
        const { game } = await getGame(gameId)
        setGame(game)
        setLoading(false)
      } catch (e) {
        message.error('can not load games')
        setLoading(false)
      }
    }
    fetchData();
    return () => ''
  }, [gameId])

  if(loading) {
    return <Loading />
  }


  return (
    <div className="">
      <GameDetailsPageHeader
        game={game}
        page={page}
        setPage={setPage}
        menu={menu}
      />
      <div className="grid mt50">
        <GameDetailsPageRooms game={game} />
      </div>
    </div>
  )
}
