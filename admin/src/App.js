import * as React from "react";
import { Admin, Resource } from "react-admin";
import Provider from "./configs/Provider";
import { AuthProvider } from "./configs/AuthProvider";
import { HttpClient } from "./configs/HttpClient";
import { BASE_URL } from "./configs/BaseUrl";

import { OpenGardenAdminLayout } from './themes/Layout';

import { TbSeeding, TbTree, TbPlant2, TbStar } from 'react-icons/tb';

import { PlantCreate, PlantEdit, PlantShow, PlantsList } from "./views/plants";
import { VarietyCreate, VarietyEdit, VarietyShow, VarietiesList } from "./views/varieties";
import { FloorCreate, FloorEdit, FloorShow, FloorsList } from "./views/floors";
import { FavoritesVarietiesList, FavoritesVarietyCreate, FavoritesVarietyShow } from "./views/favorites.varieties";

const App = () => (
  <Admin
    title="OpenGarden"
    requireAuth={true}
    layout={OpenGardenAdminLayout}
    authProvider={AuthProvider}
    dataProvider={Provider(BASE_URL, HttpClient)}>
    {permissions => (
      <>
        <Resource name="plants"
          create={permissions.includes('ADMIN') ? PlantCreate : null}
          edit={permissions.includes('ADMIN') ? PlantEdit : null}
          list={PlantsList}
          show={PlantShow}
          icon={TbTree} />
        <Resource name="varieties"
          create={permissions.includes('ADMIN') ? VarietyCreate : null}
          edit={permissions.includes('ADMIN') ? VarietyEdit : null}
          list={VarietiesList}
          show={VarietyShow}
          icon={TbSeeding} />
        <Resource name="favorites/varieties"
          create={FavoritesVarietyCreate}
          list={FavoritesVarietiesList}
          show={FavoritesVarietyShow}
          icon={TbStar} />
        <Resource name="floors"
          create={permissions.includes('ADMIN') ? FloorCreate : null}
          edit={permissions.includes('ADMIN') ? FloorEdit : null}
          list={FloorsList}
          show={FloorShow}
          icon={TbPlant2} />
      </>
    )}
  </Admin>
);

export default App;
