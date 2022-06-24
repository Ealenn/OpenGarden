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
  SimpleFormIterator,
  ArrayInput,
  SingleFieldList,
  ChipField,
  ArrayField,
  Edit,
  TabbedForm,
  FormTab,
  TabbedShowLayout,
  Tab
} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import { StringToLabelObject } from '../helpers/StringToLabelObject';
import { GetPermissions } from "../helpers/GetPermissions";

export const PlantCreate = (props) => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="Plant">
        <TextInput source="name" />
        <RichTextInput source="description" multiline fullWidth />
      </FormTab>
      <FormTab label="Classification">
        <TextInput source="classification.binomialName" />
        <TextInput source="classification.kingdom" />
        <TextInput source="classification.order" />
        <TextInput source="classification.family" />
        <TextInput source="classification.genus" />
        <TextInput source="classification.species" />
        <ArrayInput source="classification.clade">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Create>
);

export const PlantEdit = (props) => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Plant">
        <TextInput source="name" />
        <RichTextInput source="description" multiline fullWidth />
      </FormTab>
      <FormTab label="Classification">
        <TextInput source="classification.binomialName" />
        <TextInput source="classification.kingdom" />
        <TextInput source="classification.order" />
        <TextInput source="classification.family" />
        <TextInput source="classification.genus" />
        <TextInput source="classification.species" />
        <ArrayInput source="classification.clade">
          <SimpleFormIterator>
            <TextInput />
          </SimpleFormIterator>
        </ArrayInput>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const PlantsList = (props) => {
  const permissions = GetPermissions();
  return (
    <List {...props} exporter={false}>
      <Datagrid isRowSelectable={() => permissions.includes('ADMIN')}>
        <TextField source="name" />
        <TextField source="classification.binomialName" />
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

export const PlantShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <RichTextField source="description" />
      </Tab>
      <Tab label="Classification">
        <TextField source="classification.binomialName" />
        <TextField source="classification.kingdom" />
        <TextField source="classification.order" />
        <TextField source="classification.family" />
        <TextField source="classification.genus" />
        <TextField source="classification.species" />

        <ArrayField source="classification.clade">
          <SingleFieldList>
            <StringToLabelObject>
              <ChipField source="label" />
            </StringToLabelObject>
          </SingleFieldList>
        </ArrayField>
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
