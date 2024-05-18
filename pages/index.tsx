import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
    useQuery,
    gql
} from '@apollo/client';
import EntryTable from "./components/EntriesTable";
import Link from "next/link";

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


export default function Home() {
    const {loading, error, data} = useQuery(ENTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const facetTypes = ['ingredient', 'quality'];
    return (
        <div className={styles.container}>
            <Head>
                <title>Robertos</title>
                <meta name="description" content="Robertos"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <main className={styles.main}>
                <h1>Robertos Dashboard</h1>
                {facetTypes.map((facet, index) =>
                    <Link key={facet} href={`/facet/${facet}`}>
                        Filter by {facet}
                    </Link>
                )}

                <EntryTable entries={data.entries}/>
            </main>
        </div>
    )
}
