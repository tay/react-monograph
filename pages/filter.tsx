import React, {useState} from "react";
import Head from "next/head";
import {useQuery} from "@apollo/client";

import styles from "../styles/Home.module.css";
import EntriesTable from "./components/EntriesTable";
import {ENTRIES, getFacetedEntries} from "./data";
import {printIngredient} from "./utils";

type IngredientRowProps = {
    value: string;
    total: number;
    entries: Entry[];
    isActive: boolean;
    onClick: (event: any) => void;
}

const IngredientRow = ({value, total, entries, isActive, onClick}: IngredientRowProps) => {
    return <>
        <tr key={value}>
            <td className={styles.td}>{printIngredient(value)}</td>
            <td className={styles.td} align="right">{entries.length}</td>
            <td className={styles.td} align="right">{total}</td>
            <td className={styles.td} align="right">
                {isActive || <button onClick={onClick}>▼</button>}
            </td>
        </tr>
        {isActive && <IngredientEntriesTable entries={entries} />}
    </>;
}

const ENTRIES_ROW_LIMIT = 10;
const IngredientEntriesTable = ({entries}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMoreRows = entries.length > ENTRIES_ROW_LIMIT;

    return <>
        <EntriesTable entries={isExpanded ? entries : entries.slice(0, ENTRIES_ROW_LIMIT)} />
        {hasMoreRows && !isExpanded &&
          <button onClick={()=> setIsExpanded(true)}>Show More</button>}
    </>
}

const IngredientList = () => {
    const {loading, error, data} = useQuery(ENTRIES);
    const [activeValue, setActiveValue] = useState<string | null>(null);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const ingredients = getFacetedEntries(data.entries, 'ingredient');
    return <div>
        <h1>Robertos Dashboard</h1>
        <h4>Group by Ingredient</h4>
        <table className={styles.table}>
            <thead>
            <tr>
                <td className={styles.thead} width="50%">Ingredient</td>
                <td className={styles.thead} align="right">Entries</td>
                <td className={styles.thead} align="right">Total Count</td>
                <td className={styles.thead} align="right">Actions</td>
            </tr>
            </thead>
            <tbody>
            {ingredients.map(({value, total, entries}, i) =>
                <IngredientRow key={value}
                           isActive={activeValue === value}
                           value={value}
                           total={total}
                           entries={entries}
                           onClick={() => setActiveValue(value)}
                />
            )}
            </tbody>
        </table>
    </div>
}

const FilterPage = () => {
    return <div className={styles.container}>
        <Head>
            <title>Robertos</title>
            <meta name="description" content="Robertos"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <IngredientList />
        </main>
    </div>
}
export default FilterPage;
