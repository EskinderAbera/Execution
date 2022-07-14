import styles from './DetailForm.module.css'

const DetailForm = ({theEmployee}) => {
    return (
    <div className={styles.container}>
        <div className={styles.row}>
            <div className={styles.column}>
                <text className={styles.textCenter}>January</text>
                <button className={styles.image}>{theEmployee.January}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>February</text>
                <button className={styles.image}>{theEmployee.February}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>March</text>
                <button className={styles.image}>{theEmployee.March}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>April</text>
                <button className={styles.image}>{theEmployee.April}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>May</text>
                <button className={styles.image}>{theEmployee.May}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>June</text>
                <button className={styles.image}>{theEmployee.June}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>July</text>
                <button className={styles.image}>{theEmployee.July}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>August</text>
                <button className={styles.image}>{theEmployee.August}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>September</text>
                <button className={styles.image}>{theEmployee.September}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>October</text>
                <button className={styles.image}>{theEmployee.October}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>November</text>
                <button className={styles.image}>{theEmployee.November}</button>
            </div>
            <div className={styles.column}>
                <text className={styles.textCenter}>December</text>
                <button className={styles.image}>{theEmployee.December}</button>
            </div>
        </div>
    </div>
    )
}
export default DetailForm;