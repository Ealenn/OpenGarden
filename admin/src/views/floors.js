import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Show,
  RichTextField,
  ReferenceOneField,
  ShowButton,
  EditButton,
  Create,
  TextInput,
  SingleFieldList,
  ChipField,
  ArrayField,
  Edit,
  TabbedShowLayout,
  Tab,
  SimpleForm
} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import { StringToLabelObject } from '../helpers/StringToLabelObject';
import { GetPermissions } from "../helpers/GetPermissions";

export const FloorCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <RichTextInput source="description" multiline fullWidth />
    </SimpleForm>
  </Create>
);

export const FloorEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="name" />
      <RichTextInput source="description" multiline fullWidth />
    </SimpleForm>
  </Edit>
);

export const FloorsList = (props) => {
  const permissions = GetPermissions();
  return (
    <List {...props} exporter={false}>
      <Datagrid isRowSelectable={() => permissions.includes('ADMIN')}>
        <TextField source="name" />
        <ReferenceOneField reference="profiles" source="createdBy">
          <TextField source="username" />
        </ReferenceOneField>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <ChipField source="status" />
        {permissions.includes('ADMIN') && <EditButton />}
        <ShowButton />
      </Datagrid>
    </List>
  );
};

export const FloorShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <RichTextField source="description" />
      </Tab>
      <Tab label="Metadata">
        <ChipField source="status" />
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
