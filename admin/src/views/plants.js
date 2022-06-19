import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Show,
  RichTextField,
  ReferenceOneField,
  EditButton,
  ShowButton,
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

export const PlantCreate = () => (
  <Create>
    <TabbedForm>
      <FormTab label="Plant">
        <TextInput source="name" />
        <RichTextInput source="description" fullWidth />
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

export const PlantEdit = () => (
  <Edit>
    <TabbedForm>
      <FormTab label="Plant">
        <TextInput source="name" />
        <RichTextInput source="description" fullWidth />
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

export const PlantsList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" />
      <TextField source="classification.binomialName" />
      <ReferenceOneField reference="profiles" source="createdBy">
        <TextField source="username" />
      </ReferenceOneField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
      <ShowButton />
    </Datagrid>
  </List>
);

export const PlantShow = (props) => (
  <Show>
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
        <ReferenceOneField reference="profiles" source="createdBy">
          <TextField source="username" />
        </ReferenceOneField>
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
