import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Show,
  ReferenceOneField,
  ShowButton,
  Create,
  SingleFieldList,
  ChipField,
  ArrayField,
  TabbedShowLayout,
  Tab,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  ReferenceField
} from "react-admin";
import { StringToLabelObject } from '../helpers/StringToLabelObject';

export const FavoritesVarietyCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="variety" reference="varieties">
        <SelectInput optionText="name" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const FavoritesVarietiesList = (props) => {
  return (
    <List {...props} exporter={false}>
      <Datagrid>
        <ReferenceOneField reference="varieties" source="id" label="name">
          <TextField source="name" />
        </ReferenceOneField>
        <DateField source="createdAt" />
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const FavoritesVarietyShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <ReferenceField reference="varieties" source="id">
          <TextField source="name" />
        </ReferenceField>
      </Tab>
      <Tab label="Metadata">
        <ReferenceOneField reference="profiles" source="createdBy">
          <TextField source="username" />
          <ArrayField source="roles">
            <SingleFieldList>
              <StringToLabelObject>
                <ChipField source="label" />
              </StringToLabelObject>
            </SingleFieldList>
          </ArrayField>
        </ReferenceOneField>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
