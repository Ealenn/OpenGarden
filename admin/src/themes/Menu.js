import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink, useResourceDefinitions, useSidebarState } from 'react-admin';
import GitHubIcon from '@mui/icons-material/GitHub';
import DefaultIcon from '@mui/icons-material/PlayArrow';
import { Capitalize } from '../helpers/Capitalize';

export const OpenGardenAdminMenu = (props) => {
  const resources = useResourceDefinitions()
  const [open] = useSidebarState();
  return (
    <Menu {...props}>
      <DashboardMenuItem />
      {Object.keys(resources).map(name => (
        <MenuItemLink
          key={name}
          to={`/${name}`}
          primaryText={
            Capitalize(
              (resources[name].options && resources[name].options.label) ||
              name
            )
          }
          leftIcon={
            resources[name].icon ? React.createElement(resources[name].icon) : <DefaultIcon />
          }
          onClick={props.onMenuClick}
          sidebarIsOpen={open}
        />
      ))}
      <MenuItemLink onClick={() => { window.location.replace("https://github.com/Ealenn/OpenGarden") }} to="/github" primaryText="GitHub" leftIcon={<GitHubIcon />} />
    </Menu>
  );
};
