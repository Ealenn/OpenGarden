import * as React from 'react';
import { DashboardMenuItem, Menu, MenuItemLink, useResourceDefinitions, useSidebarState } from 'react-admin';
import { TbBrandGithub, TbHome2 } from 'react-icons/tb';
import DefaultIcon from '@mui/icons-material/PlayArrow';
import { Capitalize } from '../helpers/Capitalize';
import Divider from '@mui/material/Divider';

export const OpenGardenAdminMenu = (props) => {
  const resources = useResourceDefinitions()
  const [open] = useSidebarState();

  return (
    <Menu {...props}>
      <DashboardMenuItem leftIcon={<TbHome2 />} />
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
      <Divider />
      <MenuItemLink onClick={() => { window.location.replace("https://github.com/Ealenn/OpenGarden") }} to="/github" primaryText="GitHub" leftIcon={<TbBrandGithub />} />
    </Menu>
  );
};
