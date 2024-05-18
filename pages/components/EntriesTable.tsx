import styles from "../../styles/Home.module.css";
import {printDateFromInt, printIngredient} from "../utils";

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

const EntryTable = ({entries}) => {
    return <table className={styles.table}>
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
        {entries.map((entry: Entry) => <EntryItem key={entry.date}
                                                       entry={entry}/>)}
        </tbody>
    </table>
}

export default EntryTable;