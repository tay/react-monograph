import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    useQuery,
} from '@apollo/client';
import EntryTable from "./components/EntriesTable";
import Link from "next/link";
import { ENTRIES } from './data';


export default function Home() {
    const {loading, error, data} = useQuery(ENTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className={styles.container}>
            <Head>
                <title>Robertos</title>
                <meta name="description" content="Robertos"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Robertos Dashboard</h1>
                <Link href={`/filter`}>
                    Filter by Ingredient
                </Link>

                <EntryTable entries={data.entries}/>
            </main>
        </div>
    )
}
