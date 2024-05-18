import React, {useState} from "react";
import {useRouter} from "next/router";
import Head from "next/head";

import styles from "../../styles/Home.module.css";
import EntriesTable from "../components/EntriesTable";

type FacetItemProps = {
    value: string;
    total: number;
    entries: Entry[];
    isActive: boolean;
    onClick: (event: any) => void;
}
const FacetItem = ({value, isActive, onClick, entries}: FacetItemProps) => {
    return <>
        <tr key={value}>
            <td className={styles.td}>{value}</td>
            <td className={styles.td} align="right">5</td>
            <td className={styles.td} align="right">200</td>
            <td className={styles.td} align="right">
                {isActive || <button onClick={onClick}>▼</button>}
            </td>
        </tr>
        {isActive && <EntriesTable entries={entries} />}
    </>;
}

const Facet = ({facet}) => {
    const values = [
        { value: 'TOMATO', total: 100, entries: new Array<Entry>() },
        { value: 'ONION', total: 25, entries: new Array<Entry>() }
    ]
    const [activeValue, setActiveValue] = useState<string | null>(null);

    return <div>
        <h1>Robertos Dashboard</h1>
        <h4>Group by {facet}</h4>
        <table className={styles.table}>
            <thead>
            <tr>
                <td className={styles.thead} width="50%">{facet}</td>
                <td className={styles.thead} align="right">Entries</td>
                <td className={styles.thead} align="right">Total Count</td>
                <td className={styles.thead} align="right">Actions</td>
            </tr>
            </thead>
            <tbody>
            {values.map(({value, total, entries}) =>
                <FacetItem key={value}
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

const FacetPage = () => {
    const router = useRouter()
    const facet = router.query.id;

    return <div className={styles.container}>
        <Head>
            <title>Robertos</title>
            <meta name="description" content="Robertos"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <Facet facet={facet} />
        </main>
    </div>
}
export default FacetPage;
