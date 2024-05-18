import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    useQuery,
    gql
} from '@apollo/client';
import {printDateFromInt, printIngredient} from "./utils";

const ENTRIES = gql`
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

function EntryItem({entry}: { entry: Entry }) {
    return <tr>
        <td className={styles.td}>
            {printDateFromInt(entry.date)}
        </td>
        <td className={styles.td}>
            {entry.vendor.name}
        </td>
        <td className={styles.td}>
            {printIngredient(entry.ingredient)}
        </td>
        <td className={styles.td}>
            {entry.notes}
        </td>
        <td className={styles.td} align="right">
            {entry.quality}
        </td>
        <td className={styles.td} align="right">
            {entry.count}
        </td>
        <td className={styles.td} align="right">
            {entry.verify ? 'Confirmed' : <button>Verify</button>}
        </td>
    </tr>;
}

export default function Home() {
    const {loading, error, data} = useQuery(ENTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const types = []
    return (
        <div className={styles.container}>
            <Head>
                <title>Robertos</title>
                <meta name="description" content="Robertos"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Robertos Dashboard</h1>

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <td className={styles.thead}>Date</td>
                        <td className={styles.thead}>Vendor</td>
                        <td className={styles.thead}>Ingredient</td>
                        <td className={styles.thead}>Notes</td>
                        <td className={styles.thead}>Quality</td>
                        <td className={styles.thead}>Count</td>
                        <td className={styles.thead}>Actions</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.entries.map((entry: Entry) => <EntryItem key={entry.date}
                                                                   entry={entry}/>)}
                    </tbody>
                </table>
            </main>
        </div>
    )
}
