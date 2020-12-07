import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { AccountModel } from '../../typings/account';

interface Props {
  menu: any[]
  url: string
  account: AccountModel
  refresh(): void
}

export const GridSubRoutesPage: React.FC<Props> = ({ menu, url, ...rest }) => (
  <Switch>
    {menu.map((item: any, index) => (
      <Route
        key={index}
        exact
        path={`${url}/${item.page}`}
        render={props => <item.Component {...props} {...rest} />}
      />
    ))}
    <Redirect from={url} to={`${url}/${menu[0].page}`} />
  </Switch>
)