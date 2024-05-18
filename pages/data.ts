import {gql} from "@apollo/client";

export const ENTRIES = gql`
  query getEntries {
    entries {
      date
      ingredient
      notes
      count
      quality
      verify
      vendor {
        name
      }
    }
  }
`;

type Accumulator = {
    total: number;
    entries: Entry[];
}
export const getFacetedEntries = (entries: Entry[], facet: string) => {
    const map = new Map<string, Accumulator>();
    entries.forEach((entry: Entry) => {
        const value = entry[facet];
        if (!map.has(value)) {
            map.set(value, {total: 0, entries: []});
        }
        const {total, entries} = map.get(value)!;
        const newTotal = total + entry.count;
        const newEntries = [...entries, entry];
        map.set(value, {total: newTotal, entries: newEntries});
    })

    return Array
        .from(map, ([value, acc]) => ({ value, total: acc.total, entries: acc.entries }))
        .sort((a, b) => a.value > b.value ? 1 : -1);
}
