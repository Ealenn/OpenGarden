import * as React from "react";
import { Admin, Resource } from "react-admin";
import Provider from "./configs/Provider";
import { AuthProvider } from "./configs/AuthProvider";
import { HttpClient } from "./configs/HttpClient";
import { BASE_URL } from "./configs/BaseUrl";

import { OpenGardenAdminLayout } from './themes/Layout';

import { IoFlower } from "react-icons/io5";
import { PlantCreate, PlantEdit, PlantShow, PlantsList } from "./views/plants";

const App = () => (
  <Admin
    layout={OpenGardenAdminLayout}
    authProvider={AuthProvider}
    dataProvider={Provider(BASE_URL, HttpClient)}>
    <Resource name="plants"
      create={PlantCreate}
      edit={PlantEdit}
      list={PlantsList}
      show={PlantShow}
      icon={IoFlower} />
  </Admin>
);

export default App;
