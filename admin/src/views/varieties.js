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
  TabbedForm,
  FormTab,
  TabbedShowLayout,
  Tab,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  ReferenceField,
  ReferenceArrayField
} from "react-admin";
import { RichTextInput } from 'ra-input-rich-text';
import { StringToLabelObject } from '../helpers/StringToLabelObject';
import { GetPermissions } from "../helpers/GetPermissions";

const monthsSelectItems = [
  { id: 1, name: 'January' },
  { id: 2, name: 'February' },
  { id: 3, name: 'March' },
  { id: 4, name: 'April' },
  { id: 5, name: 'May' },
  { id: 6, name: 'June' },
  { id: 7, name: 'July' },
  { id: 8, name: 'August' },
  { id: 9, name: 'September' },
  { id: 10, name: 'October' },
  { id: 11, name: 'November' },
  { id: 12, name: 'December' },
];

const origins = ["AF", "AL", "DZ", "AS", "AD", "AO", "AI", "AQ", "AG", "AR", "AM", "AW", "AU", "AT", "AZ", "BS", "BH", "BD", "BB", "BY", "BE", "BZ", "BJ", "BM", "BT", "BO", "BA", "BW", "BV", "BR", "IO", "BN", "BG", "BF", "BI", "KH", "CM", "CA", "CV", "KY", "CF", "TD", "CL", "CN", "CX", "CC", "CO", "KM", "CG", "CD", "CK", "CR", "CI", "HR", "CU", "CY", "CZ", "DK", "DJ", "DM", "DO", "EC", "EG", "SV", "GQ", "ER", "EE", "ET", "FK", "FO", "FJ", "FI", "FR", "GF", "PF", "TF", "GA", "GM", "GE", "DE", "GH", "GI", "GR", "GL", "GD", "GP", "GU", "GT", "GN", "GW", "GY", "HT", "HM", "VA", "HN", "HK", "HU", "IS", "IN", "ID", "IR", "IQ", "IE", "IL", "IT", "JM", "JP", "JO", "KZ", "KE", "KI", "KP", "KR", "KW", "KG", "LA", "LV", "LB", "LS", "LR", "LY", "LI", "LT", "LU", "MO", "MG", "MW", "MY", "MV", "ML", "MT", "MH", "MQ", "MR", "MU", "YT", "MX", "FM", "MD", "MC", "MN", "MS", "MA", "MZ", "MM", "NA", "NR", "NP", "NL", "NC", "NZ", "NI", "NE", "NG", "NU", "NF", "MK", "MP", "NO", "OM", "PK", "PW", "PS", "PA", "PG", "PY", "PE", "PH", "PN", "PL", "PT", "PR", "QA", "RE", "RO", "RU", "RW", "SH", "KN", "LC", "PM", "VC", "WS", "SM", "ST", "SA", "SN", "SC", "SL", "SG", "SK", "SI", "SB", "SO", "ZA", "GS", "ES", "LK", "SD", "SR", "SJ", "SZ", "SE", "CH", "SY", "TW", "TJ", "TZ", "TH", "TL", "TG", "TK", "TO", "TT", "TN", "TR", "TM", "TC", "TV", "UG", "UA", "AE", "GB", "US", "UM", "UY", "UZ", "VU", "VE", "VN", "VG", "VI", "WF", "EH", "YE", "ZM", "ZW", "AX", "BQ", "CW", "GG", "IM", "JE", "ME", "BL", "MF", "RS", "SX", "SS", "XK "];
const originSelectItem = origins.map((origin) => ({ id: origin, name: origin }));

export const VarietyCreate = (props) => (
  <Create {...props}>
    <TabbedForm>
      <FormTab label="Variety">
        <ReferenceInput label="Plant" source="plant" reference="plants">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <SelectInput source="origin" choices={originSelectItem} />
        <SelectInput source="precocity" choices={[
          { id: 'EARLY', name: 'EARLY' },
          { id: 'LATE', name: 'LATE' },
          { id: 'MIDSEASON', name: 'MIDSEASON' }
        ]} />
        <RichTextInput source="description" multiline fullWidth />
      </FormTab>
      <FormTab label="Requirement">
        <h2>Water</h2>
        <SelectInput source="requirement.water.needs" choices={[
          { id: 'LOW', name: 'LOW' },
          { id: 'MEDIUM', name: 'MEDIUM' },
          { id: 'HIGH', name: 'HIGH' }
        ]} />
        <RichTextInput source="requirement.water.comment" multiline fullWidth />
        <h2>Sun</h2>
        <SelectInput source="requirement.sun.needs" choices={[
          { id: 'FULLSUN', name: 'FULLSUN' },
          { id: 'SEMISHADE', name: 'SEMISHADE' },
          { id: 'SHADOW', name: 'SHADOW' }
        ]} />
        <RichTextInput source="requirement.sun.comment" multiline fullWidth />
        <h2>Floors</h2>
        <ReferenceArrayInput source="requirement.floors" reference="floors">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </FormTab>
      <FormTab label="Culture">
        <h2>Types</h2>
        <SelectArrayInput source="culture.cultureTypes" choices={[
          { id: 'DIRECT_SOW', name: 'DIRECT_SOW' },
          { id: 'GREEN_HOUSE', name: 'GREEN_HOUSE' },
          { id: 'POT', name: 'POT' }
        ]} />

        <NumberInput source="culture.spacingBetweenPlants" />

        <SelectArrayInput source="culture.sowingPeriod" choices={monthsSelectItems} />
        <SelectArrayInput source="culture.growingOnPeriod" choices={monthsSelectItems} />
        <SelectArrayInput source="culture.harvestPeriod" choices={monthsSelectItems} />

        <RichTextInput source="culture.description" multiline fullWidth />
      </FormTab>
    </TabbedForm>
  </Create>
);

export const VarietyEdit = (props) => (
  <Edit {...props}>
    <TabbedForm>
      <FormTab label="Variety">
        <ReferenceInput label="Plant" source="plant" reference="plants">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="name" />
        <SelectInput source="origin" choices={originSelectItem} />
        <SelectInput source="precocity" choices={[
          { id: 'EARLY', name: 'EARLY' },
          { id: 'LATE', name: 'LATE' },
          { id: 'MIDSEASON', name: 'MIDSEASON' }
        ]} />
        <RichTextInput source="description" multiline fullWidth />
      </FormTab>
      <FormTab label="Requirement">
        <h2>Water</h2>
        <SelectInput source="requirement.water.needs" choices={[
          { id: 'LOW', name: 'LOW' },
          { id: 'MEDIUM', name: 'MEDIUM' },
          { id: 'HIGH', name: 'HIGH' }
        ]} />
        <RichTextInput source="requirement.water.comment" multiline fullWidth />
        <h2>Sun</h2>
        <SelectInput source="requirement.sun.needs" choices={[
          { id: 'FULLSUN', name: 'FULLSUN' },
          { id: 'SEMISHADE', name: 'SEMISHADE' },
          { id: 'SHADOW', name: 'SHADOW' }
        ]} />
        <RichTextInput source="requirement.sun.comment" multiline fullWidth />
        <h2>Floors</h2>
        <ReferenceArrayInput source="requirement.floors" reference="floors">
          <SelectArrayInput optionText="name" />
        </ReferenceArrayInput>
      </FormTab>
      <FormTab label="Culture">
        <h2>Types</h2>
        <SelectArrayInput source="culture.cultureTypes" choices={[
          { id: 'DIRECT_SOW', name: 'DIRECT_SOW' },
          { id: 'GREEN_HOUSE', name: 'GREEN_HOUSE' },
          { id: 'POT', name: 'POT' }
        ]} />

        <NumberInput source="culture.spacingBetweenPlants" />

        <SelectArrayInput source="culture.sowingPeriod" choices={monthsSelectItems} />
        <SelectArrayInput source="culture.growingOnPeriod" choices={monthsSelectItems} />
        <SelectArrayInput source="culture.harvestPeriod" choices={monthsSelectItems} />

        <RichTextInput source="culture.description" multiline fullWidth />
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const VarietiesList = (props) => {
  const permissions = GetPermissions();
  return (
    <List {...props} exporter={false}>
      <Datagrid isRowSelectable={() => permissions.includes('ADMIN')}>
        <TextField source="name" />
        <ReferenceOneField reference="plants" source="plant">
          <TextField source="name" />
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

export const VarietyShow = (props) => (
  <Show {...props}>
    <TabbedShowLayout>
      <Tab label="Summary">
        <TextField source="name" />
        <ReferenceField source="plant" reference="plants">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="origin" />
        <TextField source="precocity" />
        <RichTextField source="description" />
      </Tab>
      <Tab label="requirement">
        <h2>Water</h2>
        <TextField source="requirement.water.needs" />
        <RichTextField source="requirement.water.comment" />
        <h2>Sun</h2>
        <TextField source="requirement.sun.needs" />
        <RichTextField source="requirement.sun.comment" />
        <h2>Floors</h2>
        <ReferenceArrayField source="requirement.floors" reference="floors">
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Tab>
      <Tab label="culture">
        <ArrayField source="culture.cultureTypes">
          <SingleFieldList>
            <StringToLabelObject>
              <ChipField source="label" />
            </StringToLabelObject>
          </SingleFieldList>
        </ArrayField>
        <TextField source="description" />
        <TextField source="spacingBetweenPlants" />
        <ArrayField source="culture.sowingPeriod">
          <SingleFieldList>
            <StringToLabelObject>
              <ChipField source="label" />
            </StringToLabelObject>
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="culture.growingOnPeriod">
          <SingleFieldList>
            <StringToLabelObject>
              <ChipField source="label" />
            </StringToLabelObject>
          </SingleFieldList>
        </ArrayField>
        <ArrayField source="culture.harvestPeriod">
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
