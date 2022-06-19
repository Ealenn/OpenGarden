import * as React from "react";
import {
  List,
  Datagrid,
  TextField,
  DateField,
  Show,
  SimpleShowLayout,
  RichTextField,
  ReferenceOneField,
  EditButton,
  ShowButton,
  Create,
  SimpleForm,
  TextInput,
  SimpleFormIterator,
  ArrayInput,
  SingleFieldList,
  ChipField,
  ArrayField,
  Edit
} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import { StringToLabelObject } from '../helpers/StringToLabelObject';

export const PlantCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="classification.binomialName" />
      <RichTextInput source="description" />
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
    </SimpleForm>
  </Create>
);

export const PlantEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="classification.binomialName" />
      <RichTextInput source="description" />
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
    </SimpleForm>
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
    <SimpleShowLayout>
      <TextField source="name" />
      <TextField source="classification.binomialName" />

      <ArrayField source="classification.clade">
        <SingleFieldList>
          <StringToLabelObject>
            <ChipField source="label" />
          </StringToLabelObject>
        </SingleFieldList>
      </ArrayField>

      <TextField source="classification.kingdom" />
      <TextField source="classification.order" />
      <TextField source="classification.family" />
      <TextField source="classification.genus" />
      <TextField source="classification.species" />

      <RichTextField source="description" />

      <ReferenceOneField reference="profiles" source="createdBy">
        <TextField source="username" />
      </ReferenceOneField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
