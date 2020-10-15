import React from "react"
import { Menu, Icon } from "antd";
import userInfo from "../pages/home";

const { SubMenu } = Menu;

export default (layoutRouteAdministrator,layoutRoute,userInfo) => {
  let foreach = (route) => {
    return (
      <SubMenu
        key={route.key}
        title={
          <span>
            <Icon type={route.icon} />
            <span>{route.name}</span>
          </span>
        }
      >
        {
            route.children.map((child)=>(
                <Menu.Item key={child.key}>
                <Icon type={child.icon} />
                <span className="nav-text">{child.name}</span>
              </Menu.Item>
            ))
        }
      </SubMenu>
    );
  };
  if(userInfo.Administrator==='1'){
    return layoutRouteAdministrator.map(route => {
      if (route.children) {
        return foreach(route);
      } else {
          return (
              <Menu.Item key={route.key}>
              <Icon type={route.icon} />
              <span>{route.name}</span>
            </Menu.Item>
          )
      }
    });
  }else{
    return layoutRoute.map(route => {
      if (route.children) {
        return foreach(route);
      } else {
          return (
              <Menu.Item key={route.key}>
              <Icon type={route.icon} />
              <span>{route.name}</span>
            </Menu.Item>
          )
      }
    });
  }
 
};
