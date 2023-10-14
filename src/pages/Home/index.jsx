import styles from './index.module.css';

import DemoBar from './Charts/DemoBar';
import DemoBullet from './Charts/DemoBullet';
import DemoColumn from './Charts/DemoColumn';
import DemoDualAxes from './Charts/DemoDualAxes';
import DemoPie from './Charts/DemoPie';

function HomePage() {
  return (
    <div className={styles.container}>
      {/* 第一行 */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoPie />
        </div>
        <div className={styles.middle}>
          <DemoBullet />
        </div>
        <div className={styles.right}>
          <DemoPie />
        </div>
      </div>
      {/* 第二行 */}
      <div className={styles.wrapper}>
        <DemoDualAxes />
      </div>
      {/* 第三行 */}
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <DemoBar />
        </div>
        <div className={styles.right}>
          <DemoColumn />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
