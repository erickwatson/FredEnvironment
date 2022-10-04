import { Input, PropertyList, PropertyLists } from "@sceneify/core";

export async function setSettingsFromPropertyList<
  TInput extends Input<any, any, TPropertyList>,
  TProperty extends keyof TPropertyList,
  TPropertyList extends PropertyLists
>(
  input: TInput,
  property: TProperty,
  findFn: (i: PropertyList<TPropertyList[typeof property]>[number]) => boolean
) {
  // Fetch list items from OBS
  const items = await input.getPropertyListItems(property);

  // Find item that matches the provided function
  const item = items.find(findFn);

  // If item is found, update input settings
  if (item && input.settings[property] !== item.value) {
    input.setSettings({
      [property]: item.value,
    });
  }
}
